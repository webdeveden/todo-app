import { useEffect, useState } from "react";
import "./App.css";
import {
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Show,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  loadSessionsFromStorage,
  saveSessionsToStorage,
} from "./utils/storage";

import TodoForm from "./components/TodoForm";
import TodoList, { type Todo } from "./components/TodoList";
import CompletedList from "./components/CompletedList";
import NavBar from "./components/NavBar";
import TodoNavbar from "./components/TodoNavbar";
import SavedTodos, { type SavedSession } from "./components/SavedTodos";
import ShowTodo from "./components/ShowTodo";
import TimeCreated from "./components/TimeCreated";
import SearchInput from "./components/SearchInput";
import { MdOutlineNoteAlt } from "react-icons/md";
import ShowMenu from "./components/ShowMenu";
import ViewTodo from "./components/ViewTodo";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [complete, setComplete] = useState<Todo[]>([]);
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const [savedSessions, setSavedSessions] = useState<SavedSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState("");
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const menuDisclosure = useDisclosure(); // for Drawer
  const modalDisclosure = useDisclosure(); // for Modal

  const handleSubmit = () => {
    if (!description.trim()) return;

    if (editingId !== null) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editingId ? { ...todo, description } : todo
        )
      );
      setEditingId(null);
    } else {
      const newTodo: Todo = {
        id: Date.now(),
        description,
      };
      setTodos([...todos, newTodo]);
    }

    setDescription("");
  };

  const handleEdit = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    setEditingId(id);
    setDescription(todo.description);
  };

  const handleComplete = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    setComplete([...complete, todo]);
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleUndo = (id: number) => {
    const todo = complete.find((t) => t.id === id);
    if (!todo) return;
    setTodos([...todos, todo]);
    setComplete(complete.filter((t) => t.id !== id));
  };

  const handleNewTodo = () => {
    if (todos.length > 0 || complete.length > 0) {
      const sessionName =
        todos.length > 0
          ? todos[0].description
          : complete[0]?.description || "Untitled";

      const newSession: SavedSession = {
        id: Date.now(),
        name: sessionName,
        todos: [...todos],
        complete: [...complete],
        date: new Date().toISOString(),
      };
      console.log("🆕 Creating new session:", newSession);

      setSavedSessions((prev) => [...prev, newSession]);
    }

    setTodos([]);
    setComplete([]);
    setDescription("");
    setEditingId(null);
    setCurrentSessionId(null);
  };

  const handleSavedTodoClick = (session: SavedSession) => {
    setCurrentSessionId(session.id);
    modalDisclosure.onOpen();
    menuDisclosure.onClose();
    // setSearchText(" ");
  };

  const handleRemoveSaveTodo = (session: SavedSession) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${session.name}"?`
    );

    if (!confirmed) return;

    setSavedSessions((prev) => prev.filter((s) => s.id !== session.id));

    if (currentSessionId === session.id) {
      setCurrentSessionId(null);
    }
  };

  const handleSessionUpdate = (updated: SavedSession) => {
    setSavedSessions((prev) =>
      prev.map((session) => (session.id === updated.id ? updated : session))
    );
  };
  const handleSessionSaved = (updated: SavedSession) => {
    setSavedSessions((prev) =>
      prev.map((session) => (session.id === updated.id ? updated : session))
    );
    setCurrentSessionId(null);
  };

  const toggleShowCompleted = () => {
    setShowCompleted((prev) => !prev);
  };

  // Load on start
  // useEffect(() => {
  //   const saved = loadSessionsFromStorage();
  //   setSavedSessions(saved);
  // }, []);
  useEffect(() => {
    const saved = loadSessionsFromStorage();
    if (saved.length > 0) {
      console.log("✅ Sessions loaded on app start:", saved);
      setSavedSessions(saved);
    } else {
      console.log("❌ No saved sessions found in localStorage");
    }
  }, []);

  // Save whenever sessions change
  useEffect(() => {
    saveSessionsToStorage(savedSessions);
  }, [savedSessions]);

  const selectedSession = savedSessions.find((s) => s.id === currentSessionId);
  const filteredSessions = searchText.trim()
    ? savedSessions.filter((session) => {
        const lowerSearch = searchText.toLowerCase();
        const inName = session.name.toLowerCase().includes(lowerSearch);
        const inTodos = session.todos.some((todo) =>
          todo.description.toLowerCase().includes(lowerSearch)
        );
        const inComplete = session.complete.some((completed) =>
          completed.description.toLowerCase().includes(lowerSearch)
        );
        return inName || inTodos || inComplete;
      })
    : savedSessions;

  return (
    <Grid
      justifyContent="center"
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav nav" "asideLeft main asideRight"`,
      }}
      templateColumns={{ base: "1fr", lg: "300px 1fr 500px" }}
    >
      <GridItem area="nav">
        <NavBar onMenuClick={menuDisclosure.onOpen} />
        <ShowMenu
          savedSessions={savedSessions}
          currentSessionId={currentSessionId}
          onRemove={handleRemoveSaveTodo}
          onSearch={(text) => setSearchText(text)}
          onClick={handleSavedTodoClick}
          onClose={menuDisclosure.onClose}
          isOpen={menuDisclosure.isOpen}
        />
        {isMobile && selectedSession && (
          <ViewTodo
            isOpen={modalDisclosure.isOpen}
            onClose={modalDisclosure.onClose}
            showSavedSessions={selectedSession}
            onSessionUpdate={handleSessionUpdate}
            onSessionSaved={handleSessionSaved}
          />
        )}
      </GridItem>

      <Show above="lg">
        <GridItem area="asideLeft" paddingX={5} marginTop={5}>
          <Box textAlign="left">
            <SearchInput onSearch={(text) => setSearchText(text)} />
            <Text>My todos</Text>
            <SavedTodos
              savedSessions={filteredSessions}
              onClick={handleSavedTodoClick}
              currentSessionId={currentSessionId}
              onRemove={handleRemoveSaveTodo}
            />
          </Box>
        </GridItem>

        <GridItem area="asideRight" marginTop={5} paddingX={5}>
          <Card>
            <CardBody>
              {selectedSession ? (
                <ShowTodo
                  showSavedSessions={selectedSession}
                  onSessionUpdate={handleSessionUpdate}
                  onSessionSaved={handleSessionSaved}
                />
              ) : (
                <VStack justifyContent="center" alignItems="center" gap={5}>
                  <MdOutlineNoteAlt size="32px" />
                  <Text>No note opened</Text>
                </VStack>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </Show>

      <GridItem area="main" marginTop={5}>
        <Card padding={2}>
          <TodoNavbar onClick={handleNewTodo} onSave={handleNewTodo} />
          <TimeCreated />
          <TodoForm
            description={description}
            setDescription={setDescription}
            onSubmit={handleSubmit}
            isEditing={editingId !== null}
          />
          <CardBody padding={0}>
            <TodoList
              todos={todos}
              ondelete={(id) => setTodos(todos.filter((t) => t.id !== id))}
              onUpdate={handleEdit}
              onComplete={handleComplete}
            />
          </CardBody>
          {complete.length > 0 && (
            <CompletedList
              completedList={showCompleted ? complete : []}
              onSelect={toggleShowCompleted}
              onUndo={handleUndo}
            />
          )}
        </Card>
      </GridItem>
    </Grid>
  );
}

export default App;

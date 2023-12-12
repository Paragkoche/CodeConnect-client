import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/all/layout";
import LandingPage from "./pages/all";
import MuiLayout from "./pages/froms/layout";
import Login from "./pages/froms/Login";
import Signin from "./pages/froms/signin";
import DashbordLayout from "./pages/dashboard/layout";
import TeacherPage from "./pages/dashboard/teacher";
import StudentPage from "./pages/dashboard/student";
import Cores from "./pages/all/coures";
import Leaderbord from "./pages/all/leaderbord";
import TeacherAnswerPage from "./pages/dashboard/teacher/answers";
import TeacherAnswerIdPage from "./pages/dashboard/teacher/answers/id";
import TeacherCategoryPage from "./pages/dashboard/teacher/category";
import TeacherCategoryAddPage from "./pages/dashboard/teacher/category/add";
import TeacherQuestionsPage from "./pages/dashboard/teacher/questions";
import TeacherQuestionAddPage from "./pages/dashboard/teacher/questions/add";
import StudentAnswerPage from "./pages/dashboard/student/answer";
import StudentQuestionPage from "./pages/dashboard/student/question";
import StudentQuestionId from "./pages/dashboard/student/question/id";
const route = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/cores",
        element: <Cores />,
      },
      {
        path: "/leaderbord",
        element: <Leaderbord />,
      },
    ],
  },
  {
    path: "/",
    element: <MuiLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
    ],
  },
  {
    path: "dash-board/",
    element: <DashbordLayout />,
    children: [
      {
        path: "Teacher",
        element: <TeacherPage />,
      },
      {
        path: "Teacher/answers",
        element: <TeacherAnswerPage />,
      },
      {
        path: "Teacher/answers/:id",
        element: <TeacherAnswerIdPage />,
      },
      {
        path: "Teacher/category",
        element: <TeacherCategoryPage />,
      },
      {
        path: "Teacher/category/add",
        element: <TeacherCategoryAddPage />,
      },
      {
        path: "Teacher/questions",
        element: <TeacherQuestionsPage />,
      },
      {
        path: "Teacher/questions/add",
        element: <TeacherQuestionAddPage />,
      },
      {
        path: "Student",
        element: <StudentPage />,
      },
      {
        path: "Student/answer",
        element: <StudentAnswerPage />,
      },
      {
        path: "Student/question",
        element: <StudentQuestionPage />,
      },
      {
        path: "Student/question/:id",
        element: <StudentQuestionId />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={route}></RouterProvider>;
}

export default App;

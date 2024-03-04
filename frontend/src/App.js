import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthPage, { action as authAction } from "./pages/Authentication";
import CatDetailPage, {
  loader as catDetailLoader,
  action as deleteCatAction,
} from "./pages/CatDetail";
import CatsPage, { loader as catsLoader } from "./pages/Cats";
import CatsRootLayout from "./pages/CatsRoot";
import EditCatPage from "./pages/EditCat";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import NewCatPage from "./pages/NewCat";
import RootLayout from "./pages/Root";
import { action as manipulateCatAction } from "./components/CatForm";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "cats",
        element: <CatsRootLayout />,
        children: [
          {
            index: true,
            element: <CatsPage />,
            loader: catsLoader,
          },
          {
            path: ":catId",
            id: "cat-detail",
            loader: catDetailLoader,
            children: [
              {
                index: true,
                element: <CatDetailPage />,
                action: deleteCatAction,
              },
              {
                path: "edit",
                element: <EditCatPage />,
                action: manipulateCatAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewCatPage />,
            action: manipulateCatAction,
          },
        ],
      },
      { path: "auth", element: <AuthPage />, action: authAction },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

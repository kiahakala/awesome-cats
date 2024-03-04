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
import { action as logoutAction } from "./pages/Logout";
import { tokenLoader, checkAuthLoader } from "./util/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
		id: 'root',
		loader: tokenLoader,
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
								loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "new",
            element: <NewCatPage />,
            action: manipulateCatAction,
						loader: checkAuthLoader,
          },
        ],
      },
      { path: "auth", element: <AuthPage />, action: authAction },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
			{ path: 'logout', action: logoutAction }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

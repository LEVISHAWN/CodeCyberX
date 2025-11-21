import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserLogin from './pages/user-login';
import CommunityForums from './pages/community-forums';
import LessonContentViewer from './pages/lesson-content-viewer';
import LearningPathCatalog from './pages/learning-path-catalog';
import UserRegistration from './pages/user-registration';
import InteractiveCodeEditor from './pages/interactive-code-editor';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LearningPathCatalog />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/community-forums" element={<CommunityForums />} />
        <Route path="/lesson-content-viewer" element={<LessonContentViewer />} />
        <Route path="/learning-path-catalog" element={<LearningPathCatalog />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/interactive-code-editor" element={<InteractiveCodeEditor />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

/*
  Routing explanation and developer guidance

  - BrowserRouter provides HTML5 history-based routing. If server-side
    rendering is added in the future, this may be replaced/augmented.
  - ErrorBoundary wraps the router so runtime errors inside page components
    are caught and handled gracefully. Update ErrorBoundary to capture
    errors and optionally report them to your monitoring service.
  - ScrollToTop enforces consistent scroll behavior when navigating between
    routes.
  - To add a new page:
      1) Create the page component under `src/pages/...`
      2) Add an import at the top of this file
      3) Add a <Route path="/your-path" element={<YourPage/>} /> entry
  - For nested routing or layout routes (e.g., authenticated areas), use
    nested <Route> elements or <Outlet /> inside layout components.
*/

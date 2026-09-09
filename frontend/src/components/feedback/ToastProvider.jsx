import { useMemo, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { ToastContext } from "./ToastContext";

function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  function showToast({ message, variant = "success", title = "Notification" }) {
    setToast({
      message,
      variant,
      title,
    });
  }

  function hideToast() {
    setToast(null);
  }

  const value = useMemo(
    () => ({
      showToast,
      hideToast,
    }),
    [],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <ToastContainer
        position="top-end"
        className="p-3"
        aria-live="polite"
        aria-atomic="true"
      >
        <Toast
          show={Boolean(toast)}
          onClose={hideToast}
          bg={toast?.variant}
          delay={4000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">{toast?.title}</strong>
          </Toast.Header>

          <Toast.Body
            className={
              toast?.variant === "danger" || toast?.variant === "warning"
                ? "text-white"
                : undefined
            }
          >
            {toast?.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </ToastContext.Provider>
  );
}

export default ToastProvider;

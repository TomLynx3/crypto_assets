import { useState } from "react";
import { Navigate } from "react-router-dom";
import { authStore } from "../stores/auth.store";

export function PrivateRoute({children }: any) {
  return <>{authStore.isAuth ? children : <Navigate to="/login"></Navigate>}</>;
}

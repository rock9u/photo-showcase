import React from "react";

export type PhotoDialogProps = {
  children?: React.ReactNode;
};

export function PhotoDialog({ children }: PhotoDialogProps): JSX.Element {
  return (
    <>
      <dialog>
        Check this component
        {children}
      </dialog>
    </>
  );
}

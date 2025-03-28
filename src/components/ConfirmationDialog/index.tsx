import CustomDialog from "../CustomDialog";

function ConfirmationDialog({
  open,
  onClose,
  content,
  onSubmit,
  title,
  yesButtonText,
  noButtonText,
}: {
  title?: string;
  open: boolean;
  onClose(): void;
  content: any;
  onSubmit(): void;
  yesButtonText?: string;
  noButtonText?: string;
}) {
  return (
    <CustomDialog
      title={title ?? "confirm"}
      open={open}
      content={content}
      onClose={onClose}
      actions={[
        {
          content: yesButtonText ?? "Yes",
          variant: "contained",
          onClick: onSubmit,
          sx: { width: "80px", },
        },
        {
          sx: { width: "80px", },
          content: noButtonText ?? "No",
          variant: "text",
          onClick: onClose,
        },
      ]}
    />
  );
}

export default ConfirmationDialog;

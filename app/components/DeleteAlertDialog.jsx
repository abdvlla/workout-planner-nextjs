import * as AlertDialog from "@radix-ui/react-alert-dialog";
import DeleteIcon from "./icons/DeleteIcon";

const DeleteAlertDialog = ({ id, onDelete }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="text-red-500 font-semibold flex items-center">
          <DeleteIcon />
          Delete
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-gray-950 bg-opacity-50 fixed inset-0" />
        <AlertDialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-gray-50 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialog.Title className="m-0 text-[17px]  font-semibold">
            Are you sure?
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-4 mb-5 text-[15px] leading-normal">
            This action cannot be undone. This will permanently delete the item.
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <AlertDialog.Cancel asChild>
              <button className="text-white font-semibold bg-gray-500 hover:bg-gray-700 focus:shadow-gray-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] leading-none outline-none focus:shadow-[0_0_0_2px]">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={() => onDelete(id)}
                className="text-white bg-red-500 hover:bg-red-700 focus:shadow-red-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]"
              >
                Yes, delete item
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default DeleteAlertDialog;

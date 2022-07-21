/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Component, createSignal, lazy, Show } from 'solid-js';
import { IFund } from '@/interfaces/models';

// Lazy load the dialog component.
const FundCardDialog = lazy(() => import('@/components/FundCardDialog'));

const FundCard: Component<{ fund: IFund }> = (props) => {
  // Create a ref to the dialog element.
  let dialogEl: any;

  // We don't want to load every single modal since not all of them
  // will be visible. Instead, we want to render it only when it is called.
  const [isDialogVisible, setIsDialogVisible] = createSignal(false);

  /**
   * When a user clicks on the card, set the isDialogVisible signal as true
   * which will trigger it to render via the 'Show' built-in component.
   * Afterwards, display it using the HTML Dialog API.
   *
   * @returns {void}
   * @author Brian Kariuki <bkariuki@hotmail.com>
   */
  const handleShowDialog = (): void => {
    // Set the dialog to visible which will trigger it being rendered.
    setIsDialogVisible(true);

    // Show the dialog.
    dialogEl.showModal();
  };

  /**
   * When a user clicks on the card, set the isDialogVisible signal as true
   * which will trigger it to render via the 'Show' built-in component.
   * Afterwards, display it using the HTML Dialog API.
   *
   * @returns {void}
   * @author Brian Kariuki <bkariuki@hotmail.com>
   */
  const handleCloseDialog = (type: 'close' | 'cancel'): void => {
    console.log('Being clicked');

    // Close the dialog.
    dialogEl.close(type);

    // Set the dialog to invisible which will trigger it being de-rendered.
    setIsDialogVisible(false);
  };

  return (
    <>
      {/* Fund card */}
      <div
        class="transition shadow-md border-l-4 border-green-500 rounded-r-lg bg-white px-6 py-4 hover:shadow-lg cursor-pointer"
        onClick={handleShowDialog}
      >
        <h3 class="text-gray-400 text-2xl font-medium">{props.fund.name}</h3>
        <span class="text-gray-600 capitalize">{props.fund.type}</span>
      </div>

      {/* Fund Dialog */}
      <Show when={isDialogVisible()}>
        <dialog
          ref={dialogEl!}
          modal-mode="mega"
          class="w-full shadow-lg rounded-t-md p-0"
        >
          <FundCardDialog
            fund={props.fund}
            handleCloseDialog={handleCloseDialog}
          />
        </dialog>
      </Show>
    </>
  );
};

export default FundCard;

import { Dialog, Transition } from "@headlessui/react";
import cx from "classnames";
import { ReactElement, ReactNode, useMemo, useRef } from "react";
import "styles/components/CustomDialog.sass";

interface CustomDialogProp {
    anchorRef?: HTMLElement
    isOpen: boolean;
    header?: ReactNode;
    footer?: ReactNode;
    onClose?: () => void;
    className?: string;
    headerClassName?: string;
    bodyClassName?: string;
    footerClassName?: string;
    children: ReactElement;
}

export function CustomDialog({
    header,
    footer,
    isOpen,
    children,
    onClose,
    className,
    headerClassName,
    bodyClassName,
    footerClassName,
    anchorRef
}: CustomDialogProp) {
    const closeModal = () => {
        onClose?.();
    };

    const containerRef = useRef<HTMLDivElement>(null);

    const coordinate = useMemo(() => {
        let resultCoord: { right: number, top: number } | undefined = undefined;  // notice this will be undefined so that the `style` won't be passed
        if (anchorRef && isOpen) {
            const { right, bottom } = anchorRef.getBoundingClientRect();
            resultCoord = { right: document.documentElement.clientWidth - right, top: bottom };
        }
        else if (!anchorRef && isOpen) {
            resultCoord = { right: 0, top: 0 };
        }
        return resultCoord;
    }, [anchorRef, isOpen])


    return (
        <Transition show={isOpen}>
            <Dialog
                className={cx({ "custom-dialog--anchor": anchorRef }, { "custom-dialog--center": !anchorRef }, className)}
                style={coordinate}
                onClose={closeModal}
                initialFocus={containerRef}
            >
                <Dialog.Overlay className="dialog-overlay" />

                <div className="dialog-content" ref={containerRef}>
                    {header && (
                        <Dialog.Title className={cx("dialog-header", headerClassName)}>
                            {header}
                        </Dialog.Title>
                    )}

                    <div className={cx("dialog-body", bodyClassName)}>{children}</div>

                    {footer && (
                        <div className={cx("dialog-footer", footerClassName)}>{footer}</div>
                    )}
                </div>
            </Dialog>
        </Transition>
    );
};

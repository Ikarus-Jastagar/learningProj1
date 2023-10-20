import React from "react";
import Modal from "react-responsive-modal";
import BlogModalSidebar from "./BlogModalSidebar";

export default function BlogModal({
  showModal,
  setShowModal,
  redirectTo,
  title,
  html,
  primary_author,
}) {
  return (
    <Modal
      classNames={{
        modal: "mx-10 h-[93dvh] rounded-md",
        modalContainer: "flex items-center justify-center overflow-hidden",
      }}
      
      closeIcon={
        <div className="text-white p-4 hover:text-red-300">
            Close
        </div>
      }
      open={showModal}
      onClose={() => {
        redirectTo()
        setShowModal(false);
      }}
    >
      {/*header*/}
      <div className="flex max-h-[90dvh] justify-between items-center p-5 bg-slate-600 text-white border-slate-200t">
        <header className="sticky top-0 z-10">
          <h3 className="text-3xl font-semibold w-full">{title}</h3>
        </header>
      </div>
      {/*body*/}
      <div className="flex max-h-[85dvh] h-full">
        <BlogModalSidebar author={primary_author} />
        <div
          className="p-6 max-h-[85dvh] overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </div>
    </Modal>
  );
}

"use client";
import axios from "axios";
// import { Reorder, useDragControls } from "framer-motion"
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

async function getData() {
  const res = await axios.get(
    "https://beta.ikarus3d.com/api/v1/blog?tag=hash-homepage,blog-tag"
  );
  if (!res) {
    throw new Error("Failed to fetch data");
  }
  return res.data;
}

function EachBlogComp({title,html,feature_image}){
  const [showModal, setShowModal] = useState(false);
  const style_blogWrapper = "flex mx-10 my-5";
  const style_1 = "";
  const style_2 = "";
  const style_3 = "";
  return (
    <>
        <div onClick={() => setShowModal(true)} className={style_blogWrapper}>
            <img width={400} src={feature_image}/>
            <h4 className="text-3xl p-4 m-3">{title}</h4>
        </div>
      {showModal ? (
        <>
          <div
            className="m-15 justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {title}
                  </h3>
                  <div>
                    <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                        >
                        <span className="bg-red-900 text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        X
                        </span>
                    </button>
                    </div>
                </div>
                {/*body*/}
                <div dangerouslySetInnerHTML={{__html:html}} className="relative p-6 flex-auto"></div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default function BlogsComp() {
  const [blogs, setBlogs] = useState([]);

  const style_wrapper = "flex flex-col";

    function handleOnDropEnd(result){
        const items = Array.from(blogs);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setBlogs(items);
    }
  useEffect(() => {
    getData().then((e) => {
      console.log("BLOGS IN Function", e);
      setBlogs(e.message.posts);
      console.clear()
    });
  }, []);
  return (
    <>
      <section id="blogs">
        <div className={style_wrapper}>
          <div>
            <h2 className="text-6xl text-center p-10 underline underline-offset-4">
              Lets have a look at our Blogs:
            </h2>
          </div>
          <DragDropContext onDragEnd={handleOnDropEnd}>
            <Droppable droppableId="BLOGS">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {blogs.map((blog, index) => (
                    <Draggable
                      draggableId={blog.id}
                      key={blog.id}
                      id={blog.id}
                      index={index}
                    >
                      {(innerProvided) => (
                        <li
                          className="flex border-2"
                          {...innerProvided.draggableProps}
                          {...innerProvided.dragHandleProps}
                          ref={innerProvided.innerRef}
                        >
                          <EachBlogComp {...blog} />
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </section>
    </>
  );
}

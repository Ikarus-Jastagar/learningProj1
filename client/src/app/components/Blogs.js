"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Aos from "aos";

async function getData() {
  const res = await axios.get(
    "https://beta.ikarus3d.com/api/v1/blog?tag=hash-homepage,blog-tag"
  );
  if (!res) {
    throw new Error("Failed to fetch data");
  }
  return res.data;
}

function EachBlogComp({title,html,feature_image,custom_excerpt}){
  const [showModal, setShowModal] = useState(false);
  return (
    <>
        <div 
          className="transition-all rounded-md overflow-hidden flex w-[80%] mx-10 my-5 bg-slate-400 bg-opacity-75 hover:shadow-xl"
          data-aos="flip-up"
          onClick={() => setShowModal(true)} >
            <Image alt="featured_image" className="rounded-md" width={400} height={400} src={feature_image}/>
            <div className=" p-4 m-3">
              <h4 className="text-2xl font-bold">{title}</h4>
              <p>
                {custom_excerpt}
              </p>
            </div>  
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
                <div className="flex justify-between items-center p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {title}
                  </h3>
                  <div>
                    <button
                        className="p-2 flex items-center ml-auto bg-transparent border-0 text-red-500 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                        >X</button>
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
          <div onClick={() => setShowModal(false)} className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default function BlogsComp() {
  const [blogs, setBlogs] = useState([]);

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
    Aos.init()
  }, []);
  return (
    <>
      <section id="blogs">
        <div className="flex flex-col">
          <div>
            <h2 className="text-5xl text-center font-bold p-10">
              Lets have a look at our Blogs:
            </h2>
          </div>
          <div className="p-4">
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
                            className="flex justify-center"
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
        </div>
      </section>
    </>
  );
}

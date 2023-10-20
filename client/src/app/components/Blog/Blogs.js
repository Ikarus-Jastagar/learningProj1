"use client";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import Aos from "aos";
import { getBlogsData } from "@/app/server/server";
import EachBlogCompSkeleton from "./EachBlogCompSkeleton";
import EachBlogComp from "./EachBlogComp";

const expectedBlogsData = [
  { id: "RandomID1ForThisOne" },
  { id: "RandomID1ForThisTwo" },
  { id: "RandomID1ForThisThree" },
  { id: "RandomID1ForThisFour" },
];

export default function BlogsComp() {
  const [blogs, setBlogs] = useState([]);
  const [SKblogs, setSKBlogs] = useState(expectedBlogsData);

  function handleOnDropEnd(result) {
    if (!blogs.length) {
      const items = Array.from(SKblogs);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      setSKBlogs(items);
      return;
    }
    const items = Array.from(blogs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBlogs(items);
  }
  useEffect(() => {
    getBlogsData()
      .then((e) => {
        setBlogs(e.posts.slice(0, 4));
      })
      .catch((error) => {
        console.error("Unable to fetch Blog :(\n due to", error.message);
      });
    Aos.init();
  }, []);
  return (
    <>
      <section id="blogs" className="justify-center">
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
                    className="p-0 m-0"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {blogs.length
                      ? blogs.map((blog, index) => (
                          <Draggable
                            draggableId={blog.id}
                            key={blog.id}
                            id={blog.id}
                            index={index}
                          >
                            {(innerProvided) => (
                              <li
                                className="flex justify-center w-full"
                                {...innerProvided.draggableProps}
                                {...innerProvided.dragHandleProps}
                                ref={innerProvided.innerRef}
                              >
                                <EachBlogComp {...blog} />
                              </li>
                            )}
                          </Draggable>
                        ))
                      : SKblogs.map((blog, index) => (
                          <Draggable
                            draggableId={blog.id}
                            key={blog.id}
                            index={index}
                          >
                            {(innerProvided) => (
                              <li
                                className="flex justify-center"
                                {...innerProvided.draggableProps}
                                {...innerProvided.dragHandleProps}
                                ref={innerProvided.innerRef}
                              >
                                <EachBlogCompSkeleton />
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



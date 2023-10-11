"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import Aos from "aos";



const expectedBlogsData = [
  {id:"RandomID1ForThisOne"},
  {id:"RandomID1ForThisTwo"},
  {id:"RandomID1ForThisThree"},
  {id:"RandomID1ForThisFour"}
]

async function getData() {
  try{
    const res = await axios.get(
      "https://demo.ghost.io/ghost/api/content/posts/?key=22444f78447824223cefc48062&include=tags,authors"
    );
    if (!res) {
      throw new Error("Failed to fetch data");
    }
    return res.data;
  }catch(error){
    console.log("Unable to fetch Blog :(\n due to",error.message)
  }
}

function EachBlogComp({title,html,feature_image,custom_excerpt}){
  const [showModal, setShowModal] = useState(false);
  const image_size = 200
  return (
    <>
        <div 
          className="transition-all rounded-md overflow-hidden flex-col md:flex-row flex w-[80%] md:mx-10 my-5 bg-slate-400 bg-opacity-75 hover:shadow-xl"
          data-aos="flip-up" data-aos-once='true'
          onClick={() => setShowModal(true)} >
            {/* <Image alt="featured_image" className="rounded-md" width={400} height={400} src={feature_image}/> */}
            <div className="flex-[0.93] flex-col md:flex-row flex">
              <Image alt="featured_image" priority className="rounded-md w-[20rem] h-[20rem] md:w-[30rem] md:h-[100%] " width={image_size} height={image_size} src={feature_image}/>
              <div className=" p-4 m-3">
                <h4 className="text-2xl font-bold">{title}</h4>
                <p className="hidden md:block">
                  {custom_excerpt}
                </p>
              </div>
            </div>
            <div className="hidden md:flex w-[100px] hover:cursor-move flex-[0.05] h-full items-center">
              <svg viewBox="0 0 32 32">
                <rect height="4" width="4" y="4" x="0"/>
                <rect height="4" width="4" y="12" x="0"/>
                <rect height="4" width="4" y="20" x="0"/>
                <rect height="4" width="4" y="28" x="0"/>
                <rect height="4" width="4" y="4" x="8"/>
                <rect height="4" width="4" y="12" x="8"/>
                <rect height="4" width="4" y="20" x="8"/>
                <rect height="4" width="4" y="28" x="8"/>
                <rect height="4" width="4" y="4" x="16"/>
                <rect height="4" width="4" y="12" x="16"/>
                <rect height="4" width="4" y="20" x="16"/>
                <rect height="4" width="4" y="28" x="16"/>
                <rect height="4" width="4" y="4" x="24"/>
                <rect height="4" width="4" y="12" x="24"/>
                <rect height="4" width="4" y="20" x="24"/>
                <rect height="4" width="4" y="28" x="24"/>
              </svg>
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
          <div onClick={() => setShowModal(false)} className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
function EachBlogCompSkeleton(){
  return (
    <>
        <div 
          className="transition-all rounded-md overflow-hidden flex w-[80%] mx-10 my-5 bg-slate-400 bg-opacity-75 hover:shadow-xl"
          data-aos="flip-up" data-aos-once='true'>
            <div className="w-[200px] h-[200px] rounded-md skeletonAnimation"></div>
            <div className="flex-1 p-4 m-3">
              <div className="h-5 w-full rounded-md skeletonAnimation"></div>

              <div className="mt-2 w-full">
                <div className="w-full m-3 h-4 rounded-md skeletonAnimation"></div>
                <div className="w-full m-3 h-4 rounded-md skeletonAnimation"></div>
                <div className="w-full m-3 h-4 rounded-md skeletonAnimation"></div>
                <div className="w-full m-3 h-4 rounded-md skeletonAnimation"></div>
              </div>
            </div>  
            {/* <div className="h-4 w-full  skeletonAnimation"></div> */}
        </div>
    </>
  );
}

export default function BlogsComp() {
  const [blogs, setBlogs] = useState([]);
  const [SKblogs, setSKBlogs] = useState(expectedBlogsData);

    function handleOnDropEnd(result){
        if(!blogs.length){
          const items = Array.from(SKblogs);
          const [reorderedItem] = items.splice(result.source.index, 1);
          items.splice(result.destination.index, 0, reorderedItem);
  
          setSKBlogs(items);
          return
        }
        const items = Array.from(blogs);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setBlogs(items);
    }
  useEffect(() => {
    getData().then((e) => {
      setBlogs(e.posts.slice(0,4));
    }).catch((error)=>{console.error("Unable to fetch Blog :(\n due to",error.message)})
    Aos.init()
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
                    {blogs.length? blogs.map((blog, index) => (
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
                    :SKblogs.map((blog,index) => (
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

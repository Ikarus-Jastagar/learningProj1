

export default function EachBlogCompSkeleton() {
    return (
      <>
        <div
          className="transition-all rounded-md overflow-hidden flex w-[80%] mx-10 my-5 bg-slate-400 bg-opacity-75 hover:shadow-xl"
          data-aos="flip-up"
          data-aos-once="true"
        >
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
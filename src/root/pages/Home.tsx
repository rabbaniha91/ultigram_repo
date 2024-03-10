import Loader from "@/components/shared/Loader";

const Home = () => {
  const isLoading = true;
  const posts = null;
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isLoading && !posts ? (
            <div className="flex-center h-auto">  
              <Loader size="size-20"/>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

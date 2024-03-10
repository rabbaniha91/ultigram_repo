const Loader = ({size} : {size: string}) => {
  return (
    <div className="flex-center gap-2">
      <img src="/assets/icons/my-loader.svg" alt="loader" className={size}/>
      {/* <span>Loading ...</span> */}
    </div>
  );
};

export default Loader;

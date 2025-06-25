import className from "classnames"

function Buttons ({
    children , 
    primary , 
    secondary ,
    success , 
    warning ,
    danger ,
    rounded ,
    hover,
    ...rest
}) {

 const classes = className(rest.className , "  flex m-2 transition-all cursor-pointer duration-300 ease-in-out text-base    " ,
    {
        "bg-stone-800 px-6    py-1.5    text-gray-500 " : secondary && !hover,
        "bg-blue-400 px-6    py-1.5   text-blue-900" : primary && !hover ,
        "bg-yellow-500 px-6  py-1.5 text-black" : warning && !hover ,
        "bg-transparent px-6   py-1.5text-white" : danger && !hover,
        "bg-green-500 px-6  py-1.5 text-white" : success && !hover,
        "rounded-full" : rounded ,
        " bg-stone-800 px-6  py-1.5 text-gray-500 hover:scale-120 hover:text-black hover:bg-transparent hover:border-black ease-in-out " : secondary && hover,
        " bg-blue-400 border-blue-300 text-blue-900 hover:text-blue-200 hover:scale-120 px-6  py-1.5 ease-in-out " : primary && hover,
        " bg-yellow-500 py-1.5 border-yellow-400 text-gray-600 hover:text-black hover:scale-120 px-6  py-1.5  ease-in-out " : warning && hover,
        "bg-transparent px-6  py-1.5 hover:bg-red-800 border-2 border-red-300 text-red-500 hover:text-black hover:scale-120 ease-in-out " : danger && hover,
        "bg-green-500 border-green-400 hover: text-white hover:scale-120 px-6   py-1.5  ease-in-out " : success && hover,



        
    }
   )
return <div>
<button {...rest} className={classes}>{children}</button>
</div>
    
}

export default Buttons











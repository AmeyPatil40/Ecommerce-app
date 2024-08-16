const ProductDetails = ({ product }) => {
    const [currentImage, setCurrentImage] = React.useState(0);
  
    const nextImage = () => {
      setCurrentImage((currentImage + 1) % product.images.length);
    };
  
    const prevImage = () => {
      setCurrentImage((currentImage - 1 + product.images.length) % product.images.length);
    };
  
    return (
      <div>
        <img src={product.images[currentImage]} alt={product.name} className="w-full h-64 object-cover"/>
        <button onClick={prevImage}>Previous</button>
        <button onClick={nextImage}>Next</button>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>${product.price}</p>
      </div>
    );
  };
  
// import React, { useEffect } from "react";

// import { useDispatch, useSelector } from "react-redux";

// import { Link, useParams } from "react-router-dom";

// import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";

// import { getProduct } from "../../../redux/features/product/productSlice";

// import Card from "../../card/Card";

// import {SpinnerImg} from "../../loader/Loader";

// import calculateExpiryDate from '../../../utilities/expiry';

// import stockStatus from '../../../utilities/stockStatus';

// import "./limitedpd.scss";

// import { toast } from "react-toastify";

// import QRCodeGenerator from "../../qrcode/QrcodeGenerator";



// const LimitedProductDetail = () => {

//   const dispatch = useDispatch();

//   const { id } = useParams();

//   const isLoggedIn = useSelector(selectIsLoggedIn);

//   const { product, isLoading, isError, message } = useSelector(

//     (state) => state.product
//   );

  

  
// let expiryDate = "";

// if (product) {
// expiryDate = calculateExpiryDate(product.expiry_date);
// }


// let expiryString = "";
// if (expiryDate !== "expired") {
//   if (expiryDate.years > 0) {
//     expiryString += `${expiryDate.years} ${expiryDate.years > 1 ? 'years' : 'year'}, `;
//   }
//   if (expiryDate.months > 0) {
//     expiryString += `${expiryDate.months} ${expiryDate.months > 1 ? 'months' : 'month'}, `;
//   }
//   expiryString += `${expiryDate.days} ${expiryDate.days > 1 ? 'days' : 'day'}`;
// } else {
//   expiryString = "expired";
// }

  
// let displayExpiryDate = expiryDate === "expired" ? "expired" : expiryString;


//   useEffect(() => {
//     if (isLoggedIn === true) {
//       dispatch(getProduct(id));
//     }

//     if (isError) {
//       toast.message("Something went rong, please reload the page");
//     }
//   }, [isLoggedIn, isError, message, dispatch,id]);

//   return (
//     <div className="p-detail --pad">
//       <h3 className="--mt p-title">Product Detail</h3>
//       {isLoading && <SpinnerImg classes="spinner" />}
//       <Card cardClass="card">
        
//         {product && (
//           <div className="detail">
//             <Card cardClass="group image-card">
//             {isLoading ? (
//               <SpinnerImg classes="spinner-visibility"/>
//               ) : (
//             product?.image ? (
//             <img
//            src={product.image.filePath}
//            alt={product.image.fileName}
//           />
//           ) : (
//           <p>No image set for this product</p>
//            )
//            )}
//             </Card>
//             <h4>Product Availability: {stockStatus(product.quantity)}</h4>
//             <hr />
//             <h4>
//               <span className="badge">Name: </span> &nbsp; {product.name}
//             </h4>
//             <p>
//               <b>&rarr; SKU : </b> {product.sku}
//             </p>
//             <p>
//               <b>&rarr; Category : </b> {product.category}
//             </p>
//             <p>
//               <b>&rarr; Price : </b> {"$"}
//               {product.price}
//             </p>
            
//               {isLoggedIn && (
//                 <>
//                 <p>
//                 <b>&rarr; Quantity in stock : </b> {product.quantity}
//                 </p>
//                 <p>
//                   <b>&rarr; Total Value in stock : </b> {"$"}
//                   {product.price * product.quantity}
//                 </p>
//                 </>
//               )}
//             <p>
//               <b>&rarr; Production Date : </b> 
//               {product.production_date}
//             </p>
//             <p>
//               <b>&rarr; Expiry Date : </b> {product.expiry_date} </p>
//             <p>
//                <b>&rarr; Expires in : </b> 
//                {displayExpiryDate}
//             </p>

//             <hr />
//             <p>{product.description}</p>
            
//             <hr />
//             <Link to={`/edit-product/${id}`} className="edit" >
//             Edit Product
//             </Link>
//           </div>
          
//         )}
//       </Card>
     
                        
                       
//       <QRCodeGenerator/>
                        
//     </div>
//   );
// };

// export default LimitedProductDetail;



import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductDetails } from "../../../redux/features/product/productSlice";
import Card from "../../card/Card";
import {SpinnerImg} from "../../loader/Loader";
import calculateExpiryDate from '../../../utilities/expiry';
import stockStatus from '../../../utilities/stockStatus';
import "./limitedpd.scss";
import { toast } from "react-toastify";
import QRCodeGenerator from "../../qrcode/QrcodeGenerator";
import { ShowOnLogin } from "../../protect/HiddenLink";



const LimitedProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, isLoading, isError, message } = useSelector((state) => state.product);


  

  let expiryDate = "";
  if (product) {
    expiryDate = calculateExpiryDate(product.expiry_date);
  }

  let expiryString = "";
  if (expiryDate !== "expired") {
    if (expiryDate.years > 0) {
      expiryString += `${expiryDate.years} ${expiryDate.years > 1 ? 'years' : 'year'}, `;
    }
    if (expiryDate.months > 0) {
      expiryString += `${expiryDate.months} ${expiryDate.months > 1 ? 'months' : 'month'}, `;
    }
    expiryString += `${expiryDate.days} ${expiryDate.days > 1 ? 'days' : 'day'}`;
  } else {
    expiryString = "expired";
  }

  let displayExpiryDate = expiryDate === "expired" ? "expired" : expiryString;

  useEffect(() => {
    dispatch(getProductDetails(id));
    if (isError) {
      toast.message("Something went wrong, please reload the page");
    }
  }, [isError, message, dispatch, id]);

  return (
    <div className="p-detail --pad">
      <h3 className="--mt p-title">Product Detail</h3>
      {isLoading && <SpinnerImg classes="spinner" />}
      <Card cardClass="card">
        {product && (
          <div className="detail">
            <Card cardClass="group image-card">
              {isLoading ? (
                <SpinnerImg classes="spinner-visibility"/>
              ) : (
                product?.image ? (
                  <img src={product.image.filePath} alt={product.image.fileName} />
                ) : (
                  <p>No image set for this product</p>
                )
              )}
            </Card>
            <h4>Product Availability: {stockStatus(product.quantity)}</h4>
            <hr />
            <h4><span className="badge">Name: </span>   {product.name}</h4>
            <p><b>→ SKU : </b> {product.sku}</p>
            <p><b>→ Category : </b> {product.category}</p>
            <p><b>→ Price : </b> {"$"}{product.price}</p>
            <ShowOnLogin>
            <p><b>→ Quantity in stock : </b> {product.quantity}</p>
            <p><b>→ Total Value in stock : </b> {"$"}{product.price * product.quantity}</p>
            </ShowOnLogin>
            <p><b>→ Production Date : </b>{product.production_date}</p>
            <p><b>→ Expiry Date : </b> {product.expiry_date}</p>
            <p><b>→ Expires in : </b>{displayExpiryDate}</p>
            <hr />
            <p>{product.description}</p>
            <hr />
            
            <ShowOnLogin>
            <Link to={`/edit-product/${id}`} className="edit">Edit Product</Link>
            </ShowOnLogin>
          </div>
        )}
      </Card>
      <ShowOnLogin>
      <QRCodeGenerator/>
      </ShowOnLogin>
    </div>
  );
};

export default LimitedProductDetail;

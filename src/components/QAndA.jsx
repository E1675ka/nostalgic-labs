import React, { useEffect, useRef } from "react";

const QAndA = (props) => {
  const faqs = props.data;

  return (
    <div>
      <h1 className="font-bold text-4xl mb-6 mt-4 text-indigo-400 drop-shadow-xl">
        FAQs
      </h1>
      <hr className="shadow-xl" />
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="flex flex-col pl-2 pr-3 cursor-pointer shadow-xl w-102 bg-indigo-900 text-indigo-200 bg-opacity-70 m-3 rounded-md hover:scale-105 hover:bg-indigo-700 "
        >
          <p className="flex align-middle text-4xl pb-2 p-2 font-bold text-slate-100  rounded-ss-lg hover:animate-pulse">
            Q: {faq.query}
          </p>
          <p id={`${index}`} className="rounded-ee-lg p-2">
            A: {faq.Answer}
          </p>
        </div>
      ))}
    </div>
  );
};

export default QAndA;

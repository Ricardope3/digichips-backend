const catchAsync = (fn: Function, args) => {
    Promise.resolve(fn(...args)).catch((err) => console.log(err));
};

export default catchAsync

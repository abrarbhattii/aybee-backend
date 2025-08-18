// const asyncHandler = () => {}
// const asyncHandler = (fn) => {return () => {}}
// const asyncHandler = (fn) => () => {}
// const asyncHandler = (fn) => async () => {}
    
// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         });
//     }
// }

import Promise from "mongoose"

// In JavaScript, functions can be called with fewer arguments 
// than the declared args, missing arguments will be undefined.

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise
        .resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
}

// above method's duplicate
// const asyncHandler = (requestHandler) => (req, res, next) =>
// Promise.resolve(requestHandler(req, res, next)).catch(next);

export {asyncHandler}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

// 0. there is a warpper function
function asyncRequestHandler(argsfunc) {

    return function(req, res, next) {
        Promise
        .resolve(argsfunc(req, res, next))
        .catch((err) => next(err));
    };
}

// 1. we make a call 
// asyncRequestHandler is a middleware function, 
// so Express calls it with args req, res, next:
app.get('/user/:id', asyncRequestHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new Error("User not found");
  res.json(user);
}));


// 2. here the router calls that above asyncRequestHandler function
app.get('/user/:id', asyncRequestHandler(
    
        // we give async argsfunc func to asyncRequestHandler
        async function argsfunc (req, res) {
            const user = await User.findById(req.params.id);
            if (!user) throw new Error("User not found");
            res.json(user);
        }
    )
);


// 3. now asyncRequestHandler function looks like this
function asyncRequestHandler( 
    argsfunc = async function argsfunc (req, res) {
        const user = await User.findById(req.params.id);
        if (!user) throw new Error("User not found");
        res.json(user);
    }
) {
    return function(req, res, next) {
        Promise
            .resolve(argsfunc(req, res, next))
            .catch(function(err) {
                next(err);
            });
    }
}

// 4. now app.get looks like this
app.get('/user/:id', 

    function rtendfunc(req, res, next) { 
        Promise
        .resolve(argsfunc(req, res, next))
        .catch((err) => next(err))
    }

);

// 5. but acyually its like this
app.get('/user/:id', 

    // here this callback will be executed
    // in it argsfunc that we initially passed,
    // is referenced and will be called/executed
    (req, res, next) => { 
        Promise
        .resolve(argsfunc(req, res, next))
        .catch((err) => next(err))
    }

);

*/



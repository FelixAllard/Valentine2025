import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, useNavigate } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState, useEffect } from "react";
import { motion } from "framer-motion";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const Home = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setIsClicked(true);
  };
  useEffect(() => {
    if (isClicked) {
      const timer = setTimeout(() => {
        navigate("/secondpage");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isClicked, navigate]);
  return /* @__PURE__ */ jsx("div", {
    className: "d-flex vh-100 justify-content-center align-items-center home-container",
    children: /* @__PURE__ */ jsx("div", {
      className: "heart d-flex vh-100 justify-content-center align-items-center",
      children: /* @__PURE__ */ jsx(motion.svg, {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-7.2 -3.7 14.4 14.9",
        animate: {
          scale: isClicked ? 10 : 1
        },
        transition: {
          scale: {
            duration: 1.5,
            ease: "easeInOut"
          }
        },
        style: {
          width: "50vw",
          height: "50vh",
          cursor: "pointer"
        },
        onClick: handleClick,
        children: /* @__PURE__ */ jsx(motion.path, {
          d: "M0 0A1 1 0 00-7 0C-7 5-1 7 0 11 1 7 7 5 7 0A1 1 0 000 0",
          stroke: "#000000",
          strokeWidth: "0.2",
          fill: "pink",
          initial: {
            pathLength: 0
          },
          animate: {
            pathLength: 1
          },
          transition: {
            duration: 3,
            ease: "easeInOut"
          }
        })
      })
    })
  });
};
const Home$1 = withComponentProps(Home);
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home$1
}, Symbol.toStringTag, { value: "Module" }));
const MotionWrapper = ({ children, duration = 0.5, delay = 0 }) => {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration, delay },
      children
    }
  );
};
const ThankYouForComing$3 = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/third-page");
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return /* @__PURE__ */ jsx("div", {
    className: "d-flex vh-100 justify-content-center align-items-center background-pink",
    style: {
      height: "100vh"
    },
    children: /* @__PURE__ */ jsxs("div", {
      className: "heart d-flex vh-100 justify-content-center align-items-center flex-column",
      children: [/* @__PURE__ */ jsx(MotionWrapper, {
        duration: 1,
        delay: 0.2,
        children: /* @__PURE__ */ jsx("h1", {
          children: "Hello Pookie!"
        })
      }), /* @__PURE__ */ jsx(MotionWrapper, {
        duration: 1,
        delay: 0.7,
        children: /* @__PURE__ */ jsx("button", {
          className: "btn btn-danger m-2 container-md",
          onClick: handleClick,
          children: "Hello!"
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "tenor-gif-embed",
        "data-postid": "718364150893720585",
        "data-share-method": "host",
        "data-aspect-ratio": "1",
        "data-width": "100%",
        style: {
          width: "100%",
          position: "relative"
        }
      })]
    })
  });
};
const ThankYouForComing$4 = withComponentProps(ThankYouForComing$3);
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ThankYouForComing$4
}, Symbol.toStringTag, { value: "Module" }));
const ThirdPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/fourth-page");
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return /* @__PURE__ */ jsx("div", {
    className: "d-flex vh-100 justify-content-center align-items-center background-pink",
    style: {
      height: "100vh"
    },
    children: /* @__PURE__ */ jsxs("div", {
      className: "heart d-flex vh-100 justify-content-center align-items-center flex-column",
      children: [/* @__PURE__ */ jsx(MotionWrapper, {
        duration: 1,
        delay: 0.2,
        children: /* @__PURE__ */ jsx("h1", {
          children: "I'm sure I had fun today, and I sure hope you did too!"
        })
      }), /* @__PURE__ */ jsx(MotionWrapper, {
        duration: 1,
        delay: 0.7,
        children: /* @__PURE__ */ jsx("button", {
          className: "btn btn-danger m-2 container-md",
          onClick: handleClick,
          children: "I did too!"
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "tenor-gif-embed",
        "data-postid": "18383648778972099528",
        "data-share-method": "host",
        "data-aspect-ratio": "1",
        "data-width": "50%",
        style: {
          width: "100%",
          position: "relative"
        }
      })]
    })
  });
};
const ThirdPage$1 = withComponentProps(ThirdPage);
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ThirdPage$1
}, Symbol.toStringTag, { value: "Module" }));
const FourthPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/fifth-page");
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return /* @__PURE__ */ jsx("div", {
    className: "d-flex justify-content-center align-items-center background-pink",
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto"
    },
    children: /* @__PURE__ */ jsxs("div", {
      className: "heart d-flex justify-content-center align-items-center flex-column",
      style: {
        minHeight: "100vh",
        maxWidth: "90%",
        textAlign: "center",
        padding: "20px"
      },
      children: [/* @__PURE__ */ jsx(MotionWrapper, {
        duration: 1,
        delay: 0.2,
        children: /* @__PURE__ */ jsx("h1", {
          children: "Here is what I think about you"
        })
      }), /* @__PURE__ */ jsx(MotionWrapper, {
        duration: 1,
        delay: 0.2,
        children: /* @__PURE__ */ jsxs("h2", {
          children: ["You? ", /* @__PURE__ */ jsx("strong", {
            children: "You are the biggest yapper"
          }), " I have ever seen, and honestly? ", /* @__PURE__ */ jsx("span", {
            style: {
              color: "#ff4757"
            },
            children: "I think that's adorable."
          }), " ", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("br", {}), "Like, ", /* @__PURE__ */ jsx("em", {
            children: "I’m genuinely in awe."
          }), " ", /* @__PURE__ */ jsx("br", {}), "The sheer number of words flying out of your mouth at any given second? ", /* @__PURE__ */ jsx("strong", {
            children: "Unmatched. Unparalleled."
          }), " A world record in the making. ", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
            style: {
              fontSize: "1.1rem",
              fontWeight: "bold"
            },
            children: "I swear, if talking were an Olympic sport..."
          }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
            style: {
              color: "#1e90ff"
            },
            children: "🥇🥈🥉 You'd take home gold, silver, AND bronze."
          }), " ", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("br", {}), "And yet… ", /* @__PURE__ */ jsx(MotionWrapper, {
            duration: 0.5,
            delay: 1,
            children: /* @__PURE__ */ jsx("span", {
              style: {
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#ff6347"
              },
              children: "I can feel myself adapting."
            })
          }), /* @__PURE__ */ jsx(MotionWrapper, {
            duration: 0.5,
            delay: 1.3,
            children: /* @__PURE__ */ jsx("span", {
              style: {
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#32cd32"
              },
              children: "Adjusting."
            })
          }), /* @__PURE__ */ jsx(MotionWrapper, {
            duration: 0.5,
            delay: 1.6,
            children: /* @__PURE__ */ jsx("span", {
              style: {
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#957300"
              },
              children: "Even liking it."
            })
          }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("br", {}), "Because, if I’m being real? ", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
            style: {
              fontSize: "1.3rem",
              color: "#e67e22"
            },
            children: "That energy of yours, it’s kinda contagious."
          }), " ", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("br", {}), "The past few days had me like..."]
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "tenor-gif-embed",
        "data-postid": "18245739903206507120",
        "data-share-method": "host",
        "data-aspect-ratio": "1",
        "data-width": "50%",
        style: {
          width: "100%",
          position: "relative"
        }
      }), /* @__PURE__ */ jsx(MotionWrapper, {
        duration: 1,
        delay: 0.7,
        children: /* @__PURE__ */ jsx("button", {
          className: "btn btn-danger m-2 container-md",
          onClick: handleClick,
          children: "Ok and???"
        })
      })]
    })
  });
};
const FourthPage$1 = withComponentProps(FourthPage);
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FourthPage$1
}, Symbol.toStringTag, { value: "Module" }));
const FifthPage = () => {
  const navigate = useNavigate();
  const [clickedNoCount, setClickedNoCount] = useState(0);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const handleYesClick = () => {
    navigate("/sixth-page");
  };
  const handleNoClick = () => {
    setClickedNoCount((prevCount) => prevCount + 1);
    if (clickedNoCount > 5) {
      navigate("/sixth-page");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "d-flex justify-content-center align-items-center background-pink",
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      textAlign: "center",
      padding: "20px"
    },
    children: [/* @__PURE__ */ jsx(motion.h1, {
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 1
      },
      transition: {
        duration: 1
      },
      children: "Let me ask you, did you have fun today?"
    }), /* @__PURE__ */ jsx("div", {
      className: "tenor-gif-embed",
      "data-postid": clickedNoCount > 0 ? "4984662473790269249" : "10679482925078176265",
      "data-share-method": "host",
      "data-aspect-ratio": "1",
      "data-width": "50%",
      style: {
        width: "100%",
        position: "relative"
      }
    }), /* @__PURE__ */ jsx(motion.p, {
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 1
      },
      transition: {
        duration: 1
      },
      children: clickedNoCount > 0 ? "Are you sureeee?" : "Come on, be honest!"
    }), /* @__PURE__ */ jsxs("div", {
      className: "d-flex gap-3 mt-3",
      children: [/* @__PURE__ */ jsx(motion.button, {
        className: "btn btn-success",
        style: {
          fontSize: `${2 + clickedNoCount * 2}rem`,
          // Yes button grows when "No" is clicked
          padding: `${15 + clickedNoCount * 10}px ${30 + clickedNoCount * 15}px`
        },
        onClick: handleYesClick,
        whileHover: {
          scale: 1.1
        },
        children: "Yes!"
      }), /* @__PURE__ */ jsx(motion.button, {
        className: "btn btn-danger",
        style: {
          fontSize: "1.5rem",
          padding: "10px 20px",
          height: "100px",
          width: "100px"
        },
        onClick: handleNoClick,
        whileHover: {
          scale: 1.1
        },
        children: "No..."
      })]
    })]
  });
};
const FifthPage$1 = withComponentProps(FifthPage);
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FifthPage$1
}, Symbol.toStringTag, { value: "Module" }));
const SixthPage = () => {
  const navigate = useNavigate();
  const [clickedNoCount, setClickedNoCount] = useState(0);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const handleYesClick = () => {
    navigate("/seventh-page");
  };
  const handleNoClick = () => {
    setClickedNoCount((prevCount) => prevCount + 1);
    if (clickedNoCount > 5) {
      navigate("/iamsorry-page");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "d-flex justify-content-center align-items-center background-pink",
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      textAlign: "center",
      padding: "20px"
    },
    children: [/* @__PURE__ */ jsx(motion.h1, {
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 1
      },
      transition: {
        duration: 1
      },
      children: "Let me ask you... Did you have fun today?"
    }), /* @__PURE__ */ jsx("div", {
      className: "tenor-gif-embed",
      "data-postid": clickedNoCount > 0 ? "4984662473790269249" : "10679482925078176265",
      "data-share-method": "host",
      "data-aspect-ratio": "1",
      "data-width": "50%",
      style: {
        width: "100%",
        position: "relative"
      }
    }), /* @__PURE__ */ jsx(motion.p, {
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 1
      },
      transition: {
        duration: 1
      },
      children: clickedNoCount > 0 ? "Are you sureeee?" : "Come on, be honest!"
    }), /* @__PURE__ */ jsxs("div", {
      className: "d-flex gap-3 mt-3",
      children: [/* @__PURE__ */ jsx(motion.button, {
        className: "btn btn-success",
        style: {
          fontSize: `${2 + clickedNoCount * 2}rem`,
          // Yes button grows when "No" is clicked
          padding: `${15 + clickedNoCount * 10}px ${30 + clickedNoCount * 15}px`
        },
        onClick: handleYesClick,
        whileHover: {
          scale: 1.1
        },
        children: "Yes!"
      }), /* @__PURE__ */ jsx(motion.button, {
        className: "btn btn-danger",
        style: {
          fontSize: "1.5rem",
          padding: "10px 20px",
          height: "100px",
          width: "100px"
        },
        onClick: handleNoClick,
        whileHover: {
          scale: 1.1
        },
        children: "No..."
      })]
    })]
  });
};
const SixthPage$1 = withComponentProps(SixthPage);
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SixthPage$1
}, Symbol.toStringTag, { value: "Module" }));
const ThankYouForComing$2 = () => {
  useNavigate();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return /* @__PURE__ */ jsx("div", {
    className: "d-flex vh-100 justify-content-center align-items-center background-pink",
    style: {
      height: "100vh"
    },
    children: /* @__PURE__ */ jsxs("div", {
      className: "heart d-flex vh-100 justify-content-center align-items-center flex-column",
      children: [/* @__PURE__ */ jsx(MotionWrapper, {
        duration: 1,
        delay: 0.2,
        children: /* @__PURE__ */ jsx("h1", {
          children: "I am sorry you feel that way..."
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "tenor-gif-embed",
        "data-postid": "4984662473790269249",
        "data-share-method": "host",
        "data-aspect-ratio": "1",
        "data-width": "100%",
        style: {
          width: "100%",
          position: "relative"
        }
      })]
    })
  });
};
const IAmSorryPage = withComponentProps(ThankYouForComing$2);
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: IAmSorryPage
}, Symbol.toStringTag, { value: "Module" }));
const ThankYouForComing$1 = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/eight-page");
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return /* @__PURE__ */ jsx("div", {
    className: "d-flex vh-100 justify-content-center align-items-center background-pink",
    style: {
      height: "100vh"
    },
    children: /* @__PURE__ */ jsxs("div", {
      className: "heart d-flex vh-100 justify-content-center align-items-center flex-column",
      children: [/* @__PURE__ */ jsx("div", {
        className: "tenor-gif-embed",
        "data-postid": "18038469",
        "data-share-method": "host",
        "data-aspect-ratio": "1",
        "data-width": "100%",
        style: {
          width: "100%",
          position: "relative"
        }
      }), /* @__PURE__ */ jsx(MotionWrapper, {
        duration: 10,
        delay: 5,
        children: /* @__PURE__ */ jsx("h1", {
          children: "Just Joking..."
        })
      }), /* @__PURE__ */ jsx(MotionWrapper, {
        duration: 10,
        delay: 7,
        children: /* @__PURE__ */ jsx("button", {
          className: "btn btn-danger m-2 container-md",
          onClick: handleClick,
          children: "You had me worried!"
        })
      })]
    })
  });
};
const SeventhPage = withComponentProps(ThankYouForComing$1);
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SeventhPage
}, Symbol.toStringTag, { value: "Module" }));
const ThankYouForComing = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/ninth-page");
  };
  const handleClickNo = () => {
    navigate("/iamsorry-page");
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return /* @__PURE__ */ jsx("div", {
    className: "d-flex justify-content-center align-items-center background-pink",
    style: {
      minHeight: "100vh",
      // Ensures the container takes at least full height
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      // Allows scrolling when content overflows
      width: "100%"
      // Prevents horizontal overflow
    },
    children: /* @__PURE__ */ jsxs("div", {
      className: "heart d-flex justify-content-center align-items-center flex-column",
      style: {
        width: "100%",
        textAlign: "center",
        padding: "20px"
        // Adds spacing to prevent cutting off at the top
      },
      children: [/* @__PURE__ */ jsx(MotionWrapper, {
        duration: 2,
        delay: 1,
        children: /* @__PURE__ */ jsx("h1", {
          children: "I guess I just have rizz"
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "tenor-gif-embed",
        "data-postid": "13615098530330361084",
        "data-share-method": "host",
        "data-aspect-ratio": "1",
        "data-width": "100%",
        style: {
          width: "100%",
          position: "relative"
        }
      }), /* @__PURE__ */ jsx(MotionWrapper, {
        duration: 2,
        delay: 2,
        children: /* @__PURE__ */ jsx("h3", {
          children: "(I'm secretly hoping the gifs are doing their charm)"
        })
      }), /* @__PURE__ */ jsxs(MotionWrapper, {
        duration: 5,
        delay: 3,
        children: [/* @__PURE__ */ jsx("button", {
          className: "btn btn-success m-2 container-md",
          onClick: handleClick,
          children: "They are!"
        }), /* @__PURE__ */ jsx("button", {
          className: "btn btn-danger m-2 container-md",
          onClick: handleClickNo,
          children: "They are not, you clown"
        })]
      })]
    })
  });
};
const EightPage = withComponentProps(ThankYouForComing);
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EightPage
}, Symbol.toStringTag, { value: "Module" }));
const NinthPage$1 = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setIsClicked(true);
  };
  useEffect(() => {
    if (isClicked) {
      const timer = setTimeout(() => {
        navigate("/tenth-page");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isClicked, navigate]);
  return /* @__PURE__ */ jsx("div", {
    className: "d-flex justify-content-center align-items-center background-pink",
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto"
    },
    children: /* @__PURE__ */ jsxs("div", {
      className: "heart d-flex justify-content-center align-items-center flex-column",
      style: {
        minHeight: "100vh",
        maxWidth: "90%",
        textAlign: "center",
        padding: "20px"
      },
      children: [/* @__PURE__ */ jsx(MotionWrapper, {
        duration: 1,
        delay: 0.2,
        children: /* @__PURE__ */ jsx("h1", {
          children: "So now!"
        })
      }), /* @__PURE__ */ jsx(MotionWrapper, {
        duration: 1,
        delay: 0.2,
        children: /* @__PURE__ */ jsxs("h2", {
          style: {
            textAlign: "center",
            lineHeight: "1.6",
            fontSize: "1.2rem"
          },
          children: ["I don't know what ", /* @__PURE__ */ jsx("span", {
            style: {
              color: "#FF5733",
              fontWeight: "bold"
            },
            children: "future me"
          }), " will think of you when you read this, ", /* @__PURE__ */ jsx("br", {}), "but one thing is certain—", /* @__PURE__ */ jsx("span", {
            style: {
              color: "#FFD700",
              fontSize: "1.3rem"
            },
            children: "you are truly special"
          }), ". 💫", /* @__PURE__ */ jsx("br", {}), "No matter where life takes us, always remember that you shine ", /* @__PURE__ */ jsx("span", {
            style: {
              color: "#FF69B4"
            },
            children: "brighter than the stars"
          }), ". ✨", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("br", {}), "If there's one thing that ", /* @__PURE__ */ jsx("span", {
            style: {
              color: "#1E90FF",
              fontWeight: "bold"
            },
            children: "amazes and terrifies me"
          }), ", it's the sheer energy you hold, while I, most of the time, feel like a low-battery phone. ⚡🔋", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("br", {}), "You are the ", /* @__PURE__ */ jsx("span", {
            style: {
              color: "#32CD32",
              fontWeight: "bold"
            },
            children: "first person"
          }), " I have ever felt this comfortable with, so effortlessly and so fast. ", /* @__PURE__ */ jsx("br", {}), "I truly hope, no matter what happens, that we always stay connected. 💙"]
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "tenor-gif-embed",
        "data-postid": "7426510049970770085",
        "data-share-method": "host",
        "data-aspect-ratio": "1",
        "data-width": "50%",
        style: {
          width: "100%",
          position: "relative"
        }
      }), /* @__PURE__ */ jsx(MotionWrapper, {
        duration: 1,
        delay: 0.7,
        children: /* @__PURE__ */ jsx("button", {
          className: "btn btn-danger m-2 container-md",
          onClick: handleClick,
          children: "Menoum!!!!"
        })
      })]
    })
  });
};
const NinthPage$2 = withComponentProps(NinthPage$1);
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NinthPage$2
}, Symbol.toStringTag, { value: "Module" }));
const whatIsKilo = "/assets/Screenshot_20250213-215335-pb2KVHb3.png";
const NinthPage = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setIsClicked(true);
  };
  useEffect(() => {
    if (isClicked) {
      const timer = setTimeout(() => {
        navigate("/GoodBye-page");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isClicked, navigate]);
  return /* @__PURE__ */ jsx("div", {
    className: "d-flex justify-content-center align-items-center background-pink",
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto"
    },
    children: /* @__PURE__ */ jsxs("div", {
      className: "heart d-flex justify-content-center align-items-center flex-column",
      style: {
        minHeight: "100vh",
        maxWidth: "90%",
        textAlign: "center",
        padding: "20px"
      },
      children: [/* @__PURE__ */ jsx(MotionWrapper, {
        duration: 1,
        delay: 0.2,
        children: /* @__PURE__ */ jsx("h1", {
          children: "What I mean is that I am not used to this"
        })
      }), /* @__PURE__ */ jsx("img", {
        src: whatIsKilo,
        alt: "You who overtext and drives me crazy"
      }), /* @__PURE__ */ jsx(MotionWrapper, {
        duration: 1,
        delay: 0.7,
        children: /* @__PURE__ */ jsx("button", {
          className: "btn btn-danger m-2 container-md",
          onClick: handleClick,
          children: "..."
        })
      })]
    })
  });
};
const TenthPage = withComponentProps(NinthPage);
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TenthPage
}, Symbol.toStringTag, { value: "Module" }));
const GoodBye = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return /* @__PURE__ */ jsx("div", {
    className: "d-flex vh-100 justify-content-center align-items-center background-pink",
    style: {
      height: "100vh"
    },
    children: /* @__PURE__ */ jsxs("div", {
      className: "heart d-flex vh-100 justify-content-center align-items-center flex-column",
      children: [/* @__PURE__ */ jsx(MotionWrapper, {
        duration: 1,
        delay: 0.2,
        children: /* @__PURE__ */ jsxs("h1", {
          style: {
            textAlign: "center",
            fontSize: "2.5rem",
            fontWeight: "bold"
          },
          children: [/* @__PURE__ */ jsx("span", {
            style: {
              color: "#FF0000"
            },
            children: "H"
          }), /* @__PURE__ */ jsx("span", {
            style: {
              color: "#FF4500"
            },
            children: "a"
          }), /* @__PURE__ */ jsx("span", {
            style: {
              color: "#FFA500"
            },
            children: "p"
          }), /* @__PURE__ */ jsx("span", {
            style: {
              color: "#FFD700"
            },
            children: "p"
          }), /* @__PURE__ */ jsx("span", {
            style: {
              color: "#008000"
            },
            children: "y"
          }), " ", /* @__PURE__ */ jsx("span", {
            style: {
              color: "#00FA9A"
            },
            children: "V"
          }), /* @__PURE__ */ jsx("span", {
            style: {
              color: "#00CED1"
            },
            children: "a"
          }), /* @__PURE__ */ jsx("span", {
            style: {
              color: "#1E90FF"
            },
            children: "l"
          }), /* @__PURE__ */ jsx("span", {
            style: {
              color: "#4B0082"
            },
            children: "e"
          }), /* @__PURE__ */ jsx("span", {
            style: {
              color: "#9400D3"
            },
            children: "n"
          }), /* @__PURE__ */ jsx("span", {
            style: {
              color: "#FF1493"
            },
            children: "t"
          }), /* @__PURE__ */ jsx("span", {
            style: {
              color: "#FF69B4"
            },
            children: "i"
          }), /* @__PURE__ */ jsx("span", {
            style: {
              color: "#C71585"
            },
            children: "n"
          }), /* @__PURE__ */ jsx("span", {
            style: {
              color: "#DC143C"
            },
            children: "e"
          }), /* @__PURE__ */ jsx("span", {
            style: {
              color: "#FF0000"
            },
            children: "s"
          }), " ", /* @__PURE__ */ jsx("span", {
            style: {
              color: "#8B0000"
            },
            children: "D"
          }), /* @__PURE__ */ jsx("span", {
            style: {
              color: "#FF4500"
            },
            children: "a"
          }), /* @__PURE__ */ jsx("span", {
            style: {
              color: "#FFD700"
            },
            children: "y"
          }), /* @__PURE__ */ jsx("span", {
            style: {
              color: "#FF1493"
            },
            children: "!"
          })]
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "tenor-gif-embed",
        "data-postid": "11175741054448487684",
        "data-share-method": "host",
        "data-aspect-ratio": "1",
        "data-width": "50%",
        style: {
          width: "100%",
          position: "relative"
        }
      })]
    })
  });
};
const GoodBye$1 = withComponentProps(GoodBye);
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GoodBye$1
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CnL7pGwi.js", "imports": ["/assets/chunk-IR6S3I6Y-MRIP6OGk.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-DhDID2ns.js", "imports": ["/assets/chunk-IR6S3I6Y-MRIP6OGk.js", "/assets/with-props-C480mzqm.js"], "css": ["/assets/root-CtysBi0V.css"] }, "routes/Home/Home": { "id": "routes/Home/Home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/Home-2Tle2NIE.js", "imports": ["/assets/with-props-C480mzqm.js", "/assets/chunk-IR6S3I6Y-MRIP6OGk.js", "/assets/proxy-TLT7V_7-.js"], "css": [] }, "routes/SecondPageThankYouForComing/ThankYouForComing": { "id": "routes/SecondPageThankYouForComing/ThankYouForComing", "parentId": "root", "path": "/secondpage", "index": void 0, "caseSensitive": false, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/ThankYouForComing-Dxly1IgS.js", "imports": ["/assets/with-props-C480mzqm.js", "/assets/chunk-IR6S3I6Y-MRIP6OGk.js", "/assets/MotionWrapper-DzPp39cf.js", "/assets/proxy-TLT7V_7-.js"], "css": ["/assets/bootstrap-tK7EUtyc.css"] }, "routes/ThirdPage": { "id": "routes/ThirdPage", "parentId": "root", "path": "/third-page", "index": void 0, "caseSensitive": false, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/ThirdPage-C7r1JvUu.js", "imports": ["/assets/with-props-C480mzqm.js", "/assets/chunk-IR6S3I6Y-MRIP6OGk.js", "/assets/MotionWrapper-DzPp39cf.js", "/assets/proxy-TLT7V_7-.js"], "css": ["/assets/bootstrap-tK7EUtyc.css"] }, "routes/FourthPage": { "id": "routes/FourthPage", "parentId": "root", "path": "/fourth-page", "index": void 0, "caseSensitive": false, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/FourthPage-D036Xi_8.js", "imports": ["/assets/with-props-C480mzqm.js", "/assets/chunk-IR6S3I6Y-MRIP6OGk.js", "/assets/MotionWrapper-DzPp39cf.js", "/assets/proxy-TLT7V_7-.js"], "css": ["/assets/bootstrap-tK7EUtyc.css"] }, "routes/FifthPage": { "id": "routes/FifthPage", "parentId": "root", "path": "/fifth-page", "index": void 0, "caseSensitive": false, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/FifthPage-uTbBHNDp.js", "imports": ["/assets/with-props-C480mzqm.js", "/assets/chunk-IR6S3I6Y-MRIP6OGk.js", "/assets/proxy-TLT7V_7-.js"], "css": ["/assets/bootstrap-tK7EUtyc.css"] }, "routes/SixthPage": { "id": "routes/SixthPage", "parentId": "root", "path": "/sixth-page", "index": void 0, "caseSensitive": false, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/SixthPage-BTjUzMfx.js", "imports": ["/assets/with-props-C480mzqm.js", "/assets/chunk-IR6S3I6Y-MRIP6OGk.js", "/assets/proxy-TLT7V_7-.js"], "css": ["/assets/bootstrap-tK7EUtyc.css"] }, "routes/IAmSorryPage": { "id": "routes/IAmSorryPage", "parentId": "root", "path": "/iamsorry-page", "index": void 0, "caseSensitive": false, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/IAmSorryPage-CU-ZOdtA.js", "imports": ["/assets/with-props-C480mzqm.js", "/assets/chunk-IR6S3I6Y-MRIP6OGk.js", "/assets/MotionWrapper-DzPp39cf.js", "/assets/proxy-TLT7V_7-.js"], "css": ["/assets/bootstrap-tK7EUtyc.css"] }, "routes/SeventhPage": { "id": "routes/SeventhPage", "parentId": "root", "path": "/seventh-page", "index": void 0, "caseSensitive": false, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/SeventhPage-jWB_DZLW.js", "imports": ["/assets/with-props-C480mzqm.js", "/assets/chunk-IR6S3I6Y-MRIP6OGk.js", "/assets/MotionWrapper-DzPp39cf.js", "/assets/proxy-TLT7V_7-.js"], "css": ["/assets/bootstrap-tK7EUtyc.css"] }, "routes/EightPage": { "id": "routes/EightPage", "parentId": "root", "path": "/eight-page", "index": void 0, "caseSensitive": false, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/EightPage-CrxCIW3-.js", "imports": ["/assets/with-props-C480mzqm.js", "/assets/chunk-IR6S3I6Y-MRIP6OGk.js", "/assets/MotionWrapper-DzPp39cf.js", "/assets/proxy-TLT7V_7-.js"], "css": ["/assets/bootstrap-tK7EUtyc.css"] }, "routes/NinthPage": { "id": "routes/NinthPage", "parentId": "root", "path": "/ninth-page", "index": void 0, "caseSensitive": false, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/NinthPage-DgLFhcvP.js", "imports": ["/assets/with-props-C480mzqm.js", "/assets/chunk-IR6S3I6Y-MRIP6OGk.js", "/assets/MotionWrapper-DzPp39cf.js", "/assets/proxy-TLT7V_7-.js"], "css": [] }, "routes/TenthPage": { "id": "routes/TenthPage", "parentId": "root", "path": "/tenth-page", "index": void 0, "caseSensitive": false, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/TenthPage-BYaBT1BH.js", "imports": ["/assets/with-props-C480mzqm.js", "/assets/chunk-IR6S3I6Y-MRIP6OGk.js", "/assets/MotionWrapper-DzPp39cf.js", "/assets/proxy-TLT7V_7-.js"], "css": [] }, "routes/GoodBye": { "id": "routes/GoodBye", "parentId": "root", "path": "/GoodBye-page", "index": void 0, "caseSensitive": false, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/GoodBye-CNVPK7Gm.js", "imports": ["/assets/with-props-C480mzqm.js", "/assets/chunk-IR6S3I6Y-MRIP6OGk.js", "/assets/MotionWrapper-DzPp39cf.js", "/assets/proxy-TLT7V_7-.js"], "css": ["/assets/bootstrap-tK7EUtyc.css"] } }, "url": "/assets/manifest-c26b3b5b.js", "version": "c26b3b5b" };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/Home/Home": {
    id: "routes/Home/Home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/SecondPageThankYouForComing/ThankYouForComing": {
    id: "routes/SecondPageThankYouForComing/ThankYouForComing",
    parentId: "root",
    path: "/secondpage",
    index: void 0,
    caseSensitive: false,
    module: route2
  },
  "routes/ThirdPage": {
    id: "routes/ThirdPage",
    parentId: "root",
    path: "/third-page",
    index: void 0,
    caseSensitive: false,
    module: route3
  },
  "routes/FourthPage": {
    id: "routes/FourthPage",
    parentId: "root",
    path: "/fourth-page",
    index: void 0,
    caseSensitive: false,
    module: route4
  },
  "routes/FifthPage": {
    id: "routes/FifthPage",
    parentId: "root",
    path: "/fifth-page",
    index: void 0,
    caseSensitive: false,
    module: route5
  },
  "routes/SixthPage": {
    id: "routes/SixthPage",
    parentId: "root",
    path: "/sixth-page",
    index: void 0,
    caseSensitive: false,
    module: route6
  },
  "routes/IAmSorryPage": {
    id: "routes/IAmSorryPage",
    parentId: "root",
    path: "/iamsorry-page",
    index: void 0,
    caseSensitive: false,
    module: route7
  },
  "routes/SeventhPage": {
    id: "routes/SeventhPage",
    parentId: "root",
    path: "/seventh-page",
    index: void 0,
    caseSensitive: false,
    module: route8
  },
  "routes/EightPage": {
    id: "routes/EightPage",
    parentId: "root",
    path: "/eight-page",
    index: void 0,
    caseSensitive: false,
    module: route9
  },
  "routes/NinthPage": {
    id: "routes/NinthPage",
    parentId: "root",
    path: "/ninth-page",
    index: void 0,
    caseSensitive: false,
    module: route10
  },
  "routes/TenthPage": {
    id: "routes/TenthPage",
    parentId: "root",
    path: "/tenth-page",
    index: void 0,
    caseSensitive: false,
    module: route11
  },
  "routes/GoodBye": {
    id: "routes/GoodBye",
    parentId: "root",
    path: "/GoodBye-page",
    index: void 0,
    caseSensitive: false,
    module: route12
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  publicPath,
  routes
};

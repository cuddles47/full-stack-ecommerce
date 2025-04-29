import { Router, Request, Response } from "express";

import { TestRequestPriority } from "../enums/test-request.enum";

import accessHistoryMiddleware from "../middleware/access_log.middleware";

import authRouter from "./auth.route";
import accessHistoryRouter from "./access-history.route";
import consoleRouter from "./console.route";
import deviceRouter from "./device.route";
import keyRouter from "./key.route";
import permissionRouter from "./permission.route";
import roleRouter from "./role.route";
import sampleTypeRouter from "./sample-type.route";
import testIndexRouter from "./test-index.route";
import testListRouter from "./test-list.route";
import testRequestRouter from "./test-request.route";
import testResultRouter from "./test-result.route";
import userRouter from "./user.route";
import workstationRouter from "./workstation.route";
import testCatalogueRouter from "./test-catalogue.route";
import sampleRouter from "./sample.route";
import HISRouter from "./his.route";

const rootRouter: Router = Router();

// Root route
rootRouter.get(
    "/",
    [accessHistoryMiddleware],
    (req: Request, res: Response) => {
        console.log(Object.values(TestRequestPriority));
        res.json({
            message: "Hello World! This is the root route of the application.",
        });
    }
);

// Protected routes (require authentication)

rootRouter.use("/access-history", accessHistoryRouter);
rootRouter.use("/auth", authRouter);
// rootRouter.use("/device-test-indices", deviceTestIndexRouter);
rootRouter.use("/devices", deviceRouter);
rootRouter.use("/his", HISRouter); // HIS routes
rootRouter.use("/keys", keyRouter);
rootRouter.use("/permissions", permissionRouter);
rootRouter.use("/roles", roleRouter);
rootRouter.use("/samples", sampleRouter);
rootRouter.use("/sample-types", sampleTypeRouter);
rootRouter.use("/test-catalogues", testCatalogueRouter);
rootRouter.use("/test-indices", testIndexRouter);
rootRouter.use("/test-lists", testListRouter);
rootRouter.use("/test-requests", testRequestRouter);
rootRouter.use("/test-results", testResultRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/workstations", workstationRouter);

// Routes requiring key-based authentication
rootRouter.use("/console", consoleRouter);

export default rootRouter;

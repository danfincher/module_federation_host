import type { ViewContract } from "@microsoft/azureportal-reactview/Navigation";

declare global {
    interface ViewContracts {
        "HelloWorld.ReactView": ViewContract<{
            component: typeof import("./HelloWorld.ReactView").default;
        }>;
    }
}

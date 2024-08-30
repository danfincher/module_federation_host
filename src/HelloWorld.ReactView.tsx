import * as Az from "@microsoft/azureportal-reactview/Az";
import * as React from "react";
import { Text } from "@fluentui/react/lib/Text";
import { HelloWorldStrings } from "./HelloWorldStrings.resjson";


Az.setTitle(HelloWorldStrings.HelloWorldTitle);

const HelloWorld = () => {

    // Might have to create an API to handle this not returning anything?
    // Or could just make this no-op from Bootstrap
    const SharedComponent = React.lazy(() => import("remoteTest2000/SharedComponent").then(module => ({ default: module.SharedComponent })));

    return (
        <>
            <Text data-testid="helloworld-text-testid">{HelloWorldStrings.HelloWorldMessage}</Text>;
            <React.Suspense fallback={"loading..."}>
                <SharedComponent/>
            </React.Suspense>
        </>
    );      
};

export default HelloWorld;

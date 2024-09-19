import * as Az from "@microsoft/azureportal-reactview/Az";
import * as React from "react";
import { Text } from "@fluentui/react/lib/Text";
import { HelloWorldStrings } from "./HelloWorldStrings.resjson";
import { getEnvironmentValue } from "@microsoft/azureportal-reactview/Environment";

Az.setTitle(HelloWorldStrings.HelloWorldTitle);

const HelloWorld = () => {

  // Should we always deep merge the moduleMappings? Assuming that it works by the specific environment overriding the * value. If we deep merged, then all possible remote keys 
  // would be available in bootstrap. Then, we can check if the value is null, and then no-op it, rather having a require error
  // Should the no-op federated module have something in it? Or should it just be an empty function?

    // Create a wrapper that wraps this but also adds a catch and also handles when the module no-ops
    const SharedComponent1 = React.lazy(() => import("myRemote1/SharedComponent1").then(module => ({ default: module.SharedComponent1 })));

    // Only defined for DF - but specifically marked as null in config. Is there a better way to have to explicitly mark this as null?
    // Could conditionally load this based on getting the value from the environment (moduleMappings) and checking if the key exists?
    const SharedComponent2 = React.lazy(() => import("myRemote2/SharedComponent2").then(module => ({ default: module.SharedComponent2 })).catch(() => ({ default: () => <div>Failed to load component</div> })));

    // Defined as null for all environments
    const SharedComponent3 = React.lazy(() => import("myRemote3/SharedComponent3").then(module => ({ default: module.SharedComponent3 })).catch(() => ({ default: () => <div>Failed to load component</div> })));

    React.useEffect(() => {
      console.log("env", getEnvironmentValue("moduleMappings"));
    }, []);

    return (
        <>
            <Text data-testid="helloworld-text-testid">{HelloWorldStrings.HelloWorldMessage}</Text>;
            <React.Suspense fallback={"loading..."}>
                <SharedComponent1/>
                <SharedComponent2/>
                <SharedComponent3/>
            </React.Suspense>
        </>
    );      
};

export default HelloWorld;

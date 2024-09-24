import * as Az from "@microsoft/azureportal-reactview/Az";
import * as React from "react";
import { Text } from "@fluentui/react/lib/Text";
import { HelloWorldStrings } from "./HelloWorldStrings.resjson";
import { getEnvironmentValue } from "@microsoft/azureportal-reactview/Environment";

Az.setTitle(HelloWorldStrings.HelloWorldTitle);

const HelloWorld = () => {

  // This is testing fallback behavior. To test in browser, block the request to load myRemote1 (remoteTest1)  
  // Remote is defined in * so its available in all environments
  const SharedComponent1 = React.lazy(() => import("myRemote1/SharedComponent1").then(module => ({ default: module?.SharedComponent1 ?? (() => <div>fallback module loaded</div>) })));

  // Remote is only defined in df, so this is only available in df. Therefore, this no-ops in all other environments
  const SharedComponent2 = React.lazy(() => import("myRemote2/SharedComponent2").then(module => ({ default: module?.SharedComponent2 ?? (() => <div>Module no-oped because this module is not defined in this environment</div>) })));

  // Defined specifically as null in Mooncake. Otherwise, all other environments is implicitly null
  const SharedComponent3 = React.lazy(() => import("myRemote3/SharedComponent3").then(module => ({ default: module?.SharedComponent3 ?? (() => <div>No module to load in this environment</div>) })));

  React.useEffect(() => {
    console.log("env", getEnvironmentValue("moduleMappings"));
  }, []);

  return (
    <>
      <Text data-testid="helloworld-text-testid">{HelloWorldStrings.HelloWorldMessage}</Text>
      <React.Suspense fallback={"loading..."}>
        <SharedComponent1 />
        <SharedComponent2 />
        <SharedComponent3 />
      </React.Suspense>
    </>
  );
};

export default HelloWorld;

import * as Az from "@microsoft/azureportal-reactview/Az";
import * as React from "react";
import { Text } from "@fluentui/react/lib/Text";
import { HelloWorldStrings } from "./HelloWorldStrings.resjson";


/*

Try this for dynamic support

import { loadRemoteEntry } from '@module-federation/utilities';

const RemoteMarkup = React.lazy(() => 
  loadRemoteEntry({
    type: 'amd', // Specify that the remote should be AMD
    remoteEntry: 'http://localhost:3001/remoteEntry.js',
  }).then(() => import('markup/Markup'))
);


Seems that the @module-federation/utilities library is replaced with the runtime library @module-federation/runtime
https://www.npmjs.com/package/@module-federation/utilities

*/

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

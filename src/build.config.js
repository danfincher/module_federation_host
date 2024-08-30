const { ModuleFederationPlugin } = require("webpack").container;
const builder = require("@microsoft/azureportal-build").getExtensionBuilder();

console.log("Building Host...");

builder.addPlugin(new ModuleFederationPlugin({
    name: "host",
    remotes: {
        /*
            This remote becomes a dependency of HelloWorld.ReactView (or whoever lazy loads the shared module) and is written in the define statement of the generated js file
        
            This needs to have the protocol in front (https://), but we cannot have because AmdIdModuleId.cs restricts '//' being in the module name... Need to fix this
            
            So, we are able to build and serve successfully, we remove the protocol and add it back as an override in the browser for HelloWorld.ReactView.js in the depedenency 
            array for the define statement. This must be done manually

            Preorder also has a hack. The module name is remoteTest2000@localhost:3000/mfremote/Content/0.0.0/remoteEntry.js at this point. The function, getHostname throws an error
            because it cannot handle the alias, remoteTest2000@. We remove this and replace it with the protocol becoming: https://localhost:3000/mfremote/Content/0.0.0/remoteEntry.js

            The hack is added after the moduleUrl is first created from toUrl:

            if (moduleUrl.startsWith("remoteTest2000@")) {
                moduleUrl = moduleUrl.replace("remoteTest2000@", "https://");
                console.log("new moduleUrl", moduleUrl);
            }

            This also should be fixed somewhere in toURL so support this new kind of module id/name. However, this might be able to be avoided if we map this beforehand from bootstrap?
        */
        
        remoteTest2000: "remoteTest2000@localhost:3000/mfremote/Content/0.0.0/remoteEntry.js", // will need to make this dynamic... 
        /*
            We must support flighting, different environments, etc. 
            e.g. What happens if the extension being built needs to use a federated module, but the remote is not available in the environment it is being built in?
            Or, if the remote uses an API that needs to match the environment it is beicng used in?
            Or, if the remote is being flighted and the extension is not? Or vice versa?

            To make this dynamic: 
            - Extension config defines multiple remotes, (with URL, flight, etc.)
            - Host build config or MFPlugin config declares the remotes it wants to use, but in a way that a variable can be plugged in: remoteTest2000: "remoteTest-{environment}"
            - Bootstrap to select which remote to use based on environment, and plugs in the correct URL or flight info
        */
    }, 
    remoteType: "amd",
    // shared: {
    //     react: {
    //         singleton: true,
    //         requiredVersion: "17.0.2",
    //     },
    //     "react-dom": {
    //         singleton: true,
    //         requiredVersion: "17.0.2",
    //     },
    // }
}));

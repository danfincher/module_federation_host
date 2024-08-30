const { ModuleFederationPlugin } = require("webpack").container;
const builder = require("@microsoft/azureportal-build").getExtensionBuilder();

console.log("Building Host...");

builder.addPlugin(new ModuleFederationPlugin({
    name: "host",
    remotes: {
        remoteTest2000: "remoteTest2000@localhost:3000/mfremote/Content/0.0.0/remoteEntry.js", // will need to make this dynamic... external-remotes-plugin?
    }, 
    remoteType: "amd", // Doesnt work, bundlerPlugin/C# code doesnt support this (// in imports in define). Makes HelloWorldReactView have a dependency on the remoteEntry file
    shared: {
        // Will probably need to expose our own module fedetraion plugin? Just to make sure that the shared modules are the same. Unless this doesnt matter since we serve up fluent, react, and react-dom..
        // I should try to see what happens when I dont have these lines
        react: {
            singleton: true,
            requiredVersion: "17.0.2",
        },
        "react-dom": {
            singleton: true,
            requiredVersion: "17.0.2",
        },

        /*
            others:
            
            @microsoft/azureportal-reactview/
            
        */
    }
}));

// console.log("config: ", builder.ejectWebpackConfig());
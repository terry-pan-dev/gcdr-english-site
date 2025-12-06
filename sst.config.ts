/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "gcdr-website",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      region: "ap-southeast-2",
    };
  },
  async run() {
    new sst.aws.Astro("GCDR");
  },
});

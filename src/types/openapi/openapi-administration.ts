/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export type paths = {
  "/ocs/v2.php/apps/libresign/api/{apiVersion}/admin/certificate/cfssl": {
    /**
     * Generate certificate using CFSSL engine
     * @description This endpoint requires admin access
     */
    post: operations["admin-generate-certificate-cfssl"];
  };
  "/ocs/v2.php/apps/libresign/api/{apiVersion}/admin/certificate/openssl": {
    /**
     * Generate certificate using OpenSSL engine
     * @description This endpoint requires admin access
     */
    post: operations["admin-generate-certificate-open-ssl"];
  };
  "/ocs/v2.php/apps/libresign/api/{apiVersion}/admin/certificate": {
    /**
     * Load certificate data
     * @description Return all data of root certificate and a field called `generated` with a boolean value.
     * This endpoint requires admin access
     */
    get: operations["admin-load-certificate"];
  };
  "/ocs/v2.php/apps/libresign/api/{apiVersion}/admin/configure-check": {
    /**
     * Check the configuration of LibreSign
     * @description Return the status of necessary configuration and tips to fix the problems.
     * This endpoint requires admin access
     */
    get: operations["admin-configure-check"];
  };
};

export type webhooks = Record<string, never>;

export type components = {
  schemas: {
    OCSMeta: {
      status: string;
      statuscode: number;
      message?: string;
      totalitems?: string;
      itemsperpage?: string;
    };
    RootCertificate: {
      commonName: string;
      names: components["schemas"]["RootCertificateName"][];
      name?: string;
      type?: string;
    };
    RootCertificateName: {
      id: string;
      value: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
};

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = {

  /**
   * Generate certificate using CFSSL engine
   * @description This endpoint requires admin access
   */
  "admin-generate-certificate-cfssl": {
    parameters: {
      header: {
        /** @description Required to be true for the API request to pass */
        "OCS-APIRequest": boolean;
      };
      path: {
        apiVersion: "v1";
      };
    };
    requestBody: {
      content: {
        "application/json": {
          /** @description fields of root certificate */
          rootCert: {
            commonName: string;
            names: {
              [key: string]: {
                value: string;
              };
            };
          };
          /**
           * @description URI of CFSSL API
           * @default
           */
          cfsslUri?: string;
          /**
           * @description Path of config files of CFSSL
           * @default
           */
          configPath?: string;
        };
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": {
            ocs: {
              meta: components["schemas"]["OCSMeta"];
              data: {
                configPath: string;
                rootCert: components["schemas"]["RootCertificate"];
              };
            };
          };
        };
      };
      /** @description Account not found */
      401: {
        content: {
          "application/json": {
            ocs: {
              meta: components["schemas"]["OCSMeta"];
              data: {
                message: string;
              };
            };
          };
        };
      };
    };
  };
  /**
   * Generate certificate using OpenSSL engine
   * @description This endpoint requires admin access
   */
  "admin-generate-certificate-open-ssl": {
    parameters: {
      header: {
        /** @description Required to be true for the API request to pass */
        "OCS-APIRequest": boolean;
      };
      path: {
        apiVersion: "v1";
      };
    };
    requestBody: {
      content: {
        "application/json": {
          /** @description fields of root certificate */
          rootCert: {
            commonName: string;
            names: {
              [key: string]: {
                value: string;
              };
            };
          };
          /**
           * @description Path of config files of CFSSL
           * @default
           */
          configPath?: string;
        };
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": {
            ocs: {
              meta: components["schemas"]["OCSMeta"];
              data: {
                configPath: string;
                rootCert: components["schemas"]["RootCertificate"];
              };
            };
          };
        };
      };
      /** @description Account not found */
      401: {
        content: {
          "application/json": {
            ocs: {
              meta: components["schemas"]["OCSMeta"];
              data: {
                message: string;
              };
            };
          };
        };
      };
    };
  };
  /**
   * Load certificate data
   * @description Return all data of root certificate and a field called `generated` with a boolean value.
   * This endpoint requires admin access
   */
  "admin-load-certificate": {
    parameters: {
      header: {
        /** @description Required to be true for the API request to pass */
        "OCS-APIRequest": boolean;
      };
      path: {
        apiVersion: "v1";
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": {
            ocs: {
              meta: components["schemas"]["OCSMeta"];
              data: {
                configPath: string;
                rootCert: components["schemas"]["RootCertificate"];
                generated: boolean;
              };
            };
          };
        };
      };
    };
  };
  /**
   * Check the configuration of LibreSign
   * @description Return the status of necessary configuration and tips to fix the problems.
   * This endpoint requires admin access
   */
  "admin-configure-check": {
    parameters: {
      header: {
        /** @description Required to be true for the API request to pass */
        "OCS-APIRequest": boolean;
      };
      path: {
        apiVersion: "v1";
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": {
            ocs: {
              meta: components["schemas"]["OCSMeta"];
              data: Record<string, never>;
            };
          };
        };
      };
    };
  };
};
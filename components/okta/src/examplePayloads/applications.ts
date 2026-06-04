






export const getApplicationExamplePayload = {
  data: {
    id: "0oa1gjh63g214q0Hq0g4",
    orn: "orn:okta:idp:00o1n8sbwArJ7OQRw406:apps:testorgone_customsaml20app_1:0oa1gjh63g214q0Hq0g4",
    name: "testorgone_customsaml20app_1",
    label: "Custom Saml 2.0 App",
    status: "ACTIVE",
    lastUpdated: "2016-08-09T20:12:19.000Z",
    created: "2016-08-09T20:12:19.000Z",
    accessibility: {
      selfService: false,
      errorRedirectUrl: null,
      loginRedirectUrl: null,
    },
    visibility: {
      autoSubmitToolbar: false,
      hide: {
        iOS: false,
        web: false,
      },
      appLinks: {
        testorgone_customsaml20app_1_link: true,
      },
    },
    features: [],
    signOnMode: "SAML_2_0",
    credentials: {
      userNameTemplate: {
        template: "templateName",
        type: "BUILT_IN",
      },
      signing: {},
    },
    settings: {
      app: {},
      notifications: {
        vpn: {
          network: {
            connection: "DISABLED",
          },
          message: null,
          helpUrl: null,
        },
      },
      signOn: {
        defaultRelayState: "",
        ssoAcsUrl: "https://{yourOktaDomain}",
        idpIssuer: "https://www.okta.com/org.externalKey",
        audience: "https://example.com/tenant/123",
        recipient: "https://recipient.okta.com",
        destination: "https://destination.okta.com",
        subjectNameIdTemplate: "user.userName",
        subjectNameIdFormat: "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
        responseSigned: true,
        assertionSigned: true,
        signatureAlgorithm: "RSA_SHA256",
        digestAlgorithm: "SHA256",
        honorForceAuthn: true,
        authnContextClassRef: "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport",
        slo: {
          enabled: true,
          spIssuer: "https://testorgone.okta.com",
          logoutUrl: "https://testorgone.okta.com/logout",
        },
        participateSlo: {
          enabled: true,
          logoutRequestUrl: "https://testorgone.okta.com/logout/participate",
          sessionIndexRequired: true,
          bindingType: "REDIRECT",
        },
        spCertificate: {
          x5c: ["MIIFnDCCA4QCCQDBSLbiON2T1zANBgkqhkiG9w0BAQsFADCBjzELMAkGA1UEBhMCVVMxDjAMBgNV\r\n"],
        },
        assertionEncryption: {
          enabled: false,
          requestCompressed: false,
          allowMultipleAcsEndpoints: false,
          acsEndpoints: [],
          attributeStatements: [],
          _links: {
            logo: [
              {
                name: "medium",
                href: "https://testorgone.okta.com/assets/img/logos/default.6770228fb0dab49a1695ef440a5279bb.png",
                type: "image/png",
              },
            ],
            appLinks: [
              {
                name: "testorgone_customsaml20app_1_link",
                href: "https://testorgone.okta.com/home/testorgone_customsaml20app_1/0oa1gjh63g214q0Hq0g4/aln1gofChJaerOVfY0g4",
                type: "text/html",
              },
            ],
            help: {
              href: "https://testorgone-admin.okta.com/app/testorgone_customsaml20app_1/0oa1gjh63g214q0Hq0g4/setup/help/SAML_2_0/instructions",
              type: "text/html",
            },
            users: {
              href: "https://testorgone.okta.com/api/v1/apps/0oa1gjh63g214q0Hq0g4/users",
            },
            deactivate: {
              href: "https://testorgone.okta.com/api/v1/apps/0oa1gjh63g214q0Hq0g4/lifecycle/deactivate",
            },
            groups: {
              href: "https://testorgone.okta.com/api/v1/apps/0oa1gjh63g214q0Hq0g4/groups",
            },
            metadata: {
              href: "https://testorgone.okta.com/api/v1/apps/0oa1gjh63g214q0Hq0g4/sso/saml/metadata",
              type: "application/xml",
            },
          },
          _embedded: {
            user: {
              id: "00ucw2RPGIUNTDQOYPOF",
              externalId: null,
              created: "2014-03-21T23:31:35.000Z",
              lastUpdated: "2014-03-21T23:31:35.000Z",
              scope: "USER",
              status: "ACTIVE",
              statusChanged: "2014-03-21T23:31:35.000Z",
              passwordChanged: null,
              syncState: "DISABLED",
              lastSync: null,
              credentials: {
                userName: "user@example.com",
              },
              _links: {
                app: {
                  href: "https://{yourOktaDomain}/api/v1/apps/0oabizCHPNYALCHDUIOD",
                },
                user: {
                  href: "https://{yourOktaDomain}/api/v1/users/00ucw2RPGIUNTDQOYPOF",
                },
              },
            },
            id: "0oabkvBLDEKCNXBGYUAS",
            name: "template_swa",
            label: "Sample Plugin App",
            status: "ACTIVE",
            lastUpdated: "2013-09-11T17:58:54.000Z",
            created: "2013-09-11T17:46:08.000Z",
            accessibility: {
              selfService: false,
              errorRedirectUrl: null,
            },
            visibility: {
              autoSubmitToolbar: false,
              hide: {
                iOS: false,
                web: false,
              },
              appLinks: {
                login: true,
              },
            },
            features: [],
            signOnMode: "BROWSER_PLUGIN",
            credentials: {
              scheme: "EDIT_USERNAME_AND_PASSWORD",
              userNameTemplate: {
                template: "source.login",
                type: "BUILT_IN",
              },
            },
            settings: {
              app: {
                buttonField: "btn-login",
                passwordField: "txtbox-password",
                usernameField: "txtbox-username",
                url: "https://example.com/login.html",
              },
            },
            _links: {
              logo: [
                {
                  href: "https://example.okta.com/img/logos/logo_1.png",
                  name: "medium",
                  type: "image/png",
                },
              ],
              users: {
                href: "https://{yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users",
              },
              groups: {
                href: "https://{yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/groups",
              },
              self: {
                href: "https://{yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS",
              },
              deactivate: {
                href: "https://{yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/lifecycle/deactivate",
              },
            },
            _embedded: {
              user: {
                id: "00ucw2RPGIUNTDQOYPOF",
                externalId: null,
                created: "2014-06-10T15:16:01.000Z",
                lastUpdated: "2014-06-10T15:17:38.000Z",
                scope: "USER",
                status: "ACTIVE",
                statusChanged: "2014-06-10T15:16:01.000Z",
                passwordChanged: "2014-06-10T15:17:38.000Z",
                syncState: "DISABLED",
                lastSync: null,
                credentials: {
                  userName: "user@example.com",
                  password: {},
                },
                _links: {
                  app: {
                    href: "https://{yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS",
                  },
                  user: {
                    href: "https://{yourOktaDomain}/api/v1/users/00ucw2RPGIUNTDQOYPOF",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const listApplicationsExamplePayload = {
  data: [getApplicationExamplePayload.data],
};

export const getApplicationUserAssignmentsExamplePayload = {
  data: {
    id: "00u1dnq5S0CfjlkpABCD",
    externalId: "00u5edt3PNbbjzvIABCD",
    created: "2024-01-31T18:25:01.000Z",
    lastUpdated: "2024-01-31T18:25:03.000Z",
    scope: "USER",
    status: "PROVISIONED",
    statusChanged: "2024-01-31T18:25:03.000Z",
    passwordChanged: null,
    syncState: "SYNCHRONIZED",
    lastSync: "2024-01-31T18:25:03.000Z",
    credentials: {
      userName: "saml.test@example.com",
    },
    profile: {
      secondEmail: null,
      lastName: "Test",
      mobilePhone: null,
      displayName: "Saml O Test",
      email: "saml.test@example.com",
      salesforceGroups: [],
      role: "Tester",
      firstName: "Saml",
      streetAddress: null,
      profile: "Standard Platform User",
    },
    _links: {
      app: {
        href: "https://{yourOktaDomain}/api/v1/apps/0oajiqIRNXPPJBNZMGYL",
      },
      user: {
        href: "https://{yourOktaDomain}/api/v1/users/00u1dnq5S0CfjlkpABCD",
      },
    },
    _embedded: {
      user: {
        id: "00u1dnq5S0CfjlkpABCD",
        status: "ACTIVE",
        created: "2024-01-09T15:36:04.000Z",
        activated: "2024-01-09T15:36:05.000Z",
        statusChanged: "2024-01-09T15:36:05.000Z",
        lastLogin: null,
        lastUpdated: "2024-01-09T15:36:05.000Z",
        passwordChanged: "2024-01-09T15:36:05.000Z",
        type: {
          id: "otyzhh29g7Python90g3",
        },
        profile: {
          firstName: "Saml",
          lastName: "Test",
          mobilePhone: null,
          secondEmail: null,
          login: "saml.test@example.com",
          email: "saml.test@example.com",
        },
        credentials: {
          password: {},
          provider: {
            type: "OKTA",
            name: "OKTA",
          },
        },
        _links: {
          suspend: {
            href: "https://{yourOktaDomain}/api/v1/users/00u1dnq5S0CfjlkpABCD/lifecycle/suspend",
            method: "POST",
          },
          schema: {
            href: "https://{yourOktaDomain}/api/v1/meta/schemas/user/oscarho9g7PythoN23z9",
          },
          resetPassword: {
            href: "https://{yourOktaDomain}/api/v1/users/00u1dnq5S0CfjlkpABCD/lifecycle/reset_password",
            method: "POST",
          },
          expirePassword: {
            href: "https://{yourOktaDomain}/api/v1/users/00u1dnq5S0CfjlkpABCD/lifecycle/expire_password",
            method: "POST",
          },
          changeRecoveryQuestion: {
            href: "https://{yourOktaDomain}/api/v1/users/00u1dnq5S0CfjlkpABCD/credentials/change_recovery_question",
            method: "POST",
          },
          self: {
            href: "https://{yourOktaDomain}/api/v1/users/00u1dnq5S0CfjlkpABCD",
          },
          type: {
            href: "https://{yourOktaDomain}/api/v1/meta/types/user/otyzhh29g7Python90g3",
          },
          changePassword: {
            href: "https://rain.okta1.com/api/v1/users/00u1dnq5S0CfjlkpABCD/credentials/change_password",
            method: "POST",
          },
          deactivate: {
            href: "https://{yourOktaDomain}/api/v1/users/00u1dnq5S0CfjlkpABCD/lifecycle/deactivate",
            method: "POST",
          },
        },
      },
    },
  },
};

export const updateApplicationUserAssignmentsExamplePayload = {
  data: {
    credentials: {
      userName: "rae.cloud@example.com",
      password: {
        value: "updatedP@55word",
      },
    },
  },
};

export const removeApplicationUserAssignmentExamplePayload = {
  data: {
    id: "00u1dnq5S0CfjlkpABCD",
    status: "DELETED",
  },
};

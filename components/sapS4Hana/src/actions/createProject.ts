import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getSapClient } from "../client";
import { requestBodyCode, connectionInput } from "../inputs";

export const createProject = action({
  display: {
    label: "Create Project",
    description:
      "Creates a customer or internal project based on the level of information you provide.",
  },
  perform: async (_context, { requestBodyCode, connectionInput }) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const client = getSapClient(connectionInput, headers);
    try {
      const { data } = await client.post(
        "/sap/opu/odata/CPD/SC_PROJ_ENGMT_CREATE_UPD_SRV/ProjectSet",
        requestBodyCode,
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    requestBodyCode: {
      ...requestBodyCode,
      required: true,
      default: `{
      "ProjectID": "string",
      "ProjectName": "string",
      "ProjectStage": "string",
      "OrgID": "string",
      "ProjectCategory": "string",
      "Currency": "string",
      "StartDate": "/Date(1492098664000)/",
      "EndDate": "/Date(1492098664000)/",
      "ProjManagerExtId": "string",
      "ProjManagerCompCode": "string",
      "Customer": "string",
      "CostCenter": "string",
      "ProfitCenter": "string",
      "ProjAccountantExtId": "string",
      "ProjAccountantCompCode": "string",
      "ProjControllerExtId": "string",
      "ProjControllerCompCode": "string",
      "ProjPartnerExtId": "string",
      "ProjPartnerCompCode": "string",
      "ProjectDesc": "string",
      "Confidential": "string",
      "UseProjectBilling": "string",
      "RestrictTimePosting": "string",
      "ProjectRoleSet": {
         "results": [
            {
               "ProjectID": "string",
               "ProjectRoleID": "string",
               "BusinessPartnerID": "string"
            }
         ]
      },
      "WorkPackageSet": {
         "results": [
            {
               "ProjectID": "string",
               "WorkPackageID": "string",
               "WorkPackageName": "string",
               "Description": "string",
               "WPStartDate": "/Date(1492098664000)/",
               "WPEndDate": "/Date(1492098664000)/",
               "WorkPackageType": "string",
               "UnitQuantity": "0",
               "UnitId": "string",
               "to_ResourceDemand": {
                  "results": [
                     {
                        "WorkPackage": "string",
                        "ResourceDemand": "string",
                        "Version": "string",
                        "EngagementProject": "string",
                        "WorkItem": "string",
                        "BillingControlCategory": "string",
                        "DeliveryOrganization": "string",
                        "EngagementProjectResourceType": "string",
                        "EngagementProjectResource": "string",
                        "WorkforcePersonUserID": "string",
                        "Country2DigitISOCode": "string",
                        "KeyDate": "/Date(1492041600000)/",
                        "PersonWorkAgreement": "string",
                        "ResourceDemandStatus": "string",
                        "UnitOfMeasure": "string",
                        "Quantity": "0",
                        "to_ResourceDemandDistribution": {
                           "results": [
                              {
                                 "WorkPackage": "string",
                                 "ResourceDemand": "string",
                                 "Version": "string",
                                 "CalendarMonth": "string",
                                 "CalendarYear": "string",
                                 "UnitOfMeasure": "string",
                                 "Quantity": "0",
                                 "to_ResourceDemand": null
                              }
                           ]
                        },
                        "to_ResourceDemandSkills": "",
                        "to_ResourceSupply": {
                           "results": [
                              {
                                 "WorkPackage": "string",
                                 "ResourceDemand": "string",
                                 "ResourceSupply": "string",
                                 "Version": "string",
                                 "EngagementProject": "string",
                                 "DeliveryOrganization": "string",
                                 "WorkforcePersonUserID": "string",
                                 "Country2DigitISOCode": "string",
                                 "KeyDate": "/Date(1492041600000)/",
                                 "PersonWorkAgreement": "string",
                                 "UnitOfMeasure": "string",
                                 "Quantity": "0",
                                 "to_ResourceDemand": null,
                                 "to_ResourceSupplyDistribution": {
                                    "results": [
                                       {
                                          "WorkPackage": "string",
                                          "ResourceDemand": "string",
                                          "ResourceSupply": "string",
                                          "Version": "string",
                                          "CalendarMonth": "string",
                                          "CalendarYear": "string",
                                          "UnitOfMeasure": "string",
                                          "Quantity": "0",
                                          "to_ResourceSupply": ""
                                       }
                                    ]
                                 }
                              }
                           ]
                        }
                     }
                  ]
               },
               "to_Project": null,
               "WorkItemSet": {
                  "results": [
                     {
                        "ProjectID": "string",
                        "WorkPackageID": "string",
                        "WorkPackageName": "string",
                        "Workitem": "string",
                        "Workitemname": "string"
                     }
                  ]
               },
               "DemandSet": {
                  "results": [
                     {
                        "BillingControlCategory": "string",
                        "ProjectID": "string",
                        "Skills": "string",
                        "WorkPackageID": "string",
                        "ExpenseCost": "0",
                        "WorkPackageName": "string",
                        "ExpenseRevenue": "0",
                        "ResType": "string",
                        "ResourceId": "string",
                        "Workitem": "string",
                        "Effort": "0",
                        "DelvryServOrg": "string"
                     }
                  ]
               },
               "WorkPackageFunctionSet": {
                  "results": [
                     {
                        "ProjectID": "string",
                        "WorkPackageID": "string",
                        "WorkPackageName": "string",
                        "WorkPackageFunctionId": "string",
                        "WorkPackageFunctionIsBlocked": "string"
                     }
                  ]
               }
            }
         ]
      }
   }`,
    },
    connectionInput,
  },
});

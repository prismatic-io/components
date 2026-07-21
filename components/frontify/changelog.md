## Changelog

### 2026-07-21

Restructured action inputs into structured objects for an improved user experience.

- **Create Asset** and **Update Asset** group optional metadata inputs into **Additional Fields**
- List actions (**List Users**, **List User Groups**, **List Asset Comments**, **List Related Assets**, **List Brand Libraries**, **List Brand Workspace Projects**, **List Library Assets**, **List Library Collaborators**, **List Library Collections**, **List Library Folders**, **List Webhooks**, **List Workspace Project Assets**, and **List Workspace Project Folders**) group page controls into **Pagination**; **Fetch All** stays a top-level toggle

### 2026-06-05

Added the **New and Updated Assets** polling trigger, which checks a library for assets created or modified since the last run

### 2026-04-30

Updated spectral version

### 2026-04-08

Updated links to Frontify developer documentation.

### 2026-03-27

Added optional **Brand ID** and **Library ID** inputs to folder and collection actions to support the inline datasource dependency chain (Brand → Library → Folder/Collection):

- **Delete Folders**
- **Move Folders**
- **Update Folder**
- **Delete Collection**
- **Update Collection**
- **Get Library**
- **List Library Assets**
- **List Library Collaborators**
- **List Library Collections**
- **List Library Folders**

### 2026-02-26

Added inline data sources for workspace project folders, webhooks, related assets, library folders, and library collections to enable dynamic dropdown selection

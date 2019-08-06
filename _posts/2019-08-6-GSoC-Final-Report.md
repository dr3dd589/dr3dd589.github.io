---
layout:     post
title:      GSoC'19 Final Report  | OWASP Foundation
date:       2019-08-06 11:31:19
author:     dr3dd
summary:    Google summer of code 2019 final report
categories: Development
thumbnail:  book
tags:
 - Google Summer of code 2019
 - OWASP
 - DefectDojo
 - Opensource
 - python
 - Django
---

<p align="center">
  <img src="https://cdn-images-1.medium.com/max/800/1*g5RBYeGe0VLB6t_ZsvO_wQ.png"><br>
  <h2>---- GSoC'19 Final Report  | OWASP Foundation ( Project- DefectDojo) ----</h2>
</p>
DefectDojo is a security tool that automates application security vulnerability management. DefectDojo streamlines the application security testing process by offering features such as importing third-party security findings, merging and deduping, integration with Jira, templating, report generation and security metrics.
This project target to implementing Scan2.0 And Writing Unittests for tools to ensure that they working correctly.

```
 - ORGANIZATION  | CATEGORY
    - OWASP Foundation | defect dojo
 - MENTORS
    - Aaron Weaver
 - STUDENT DETAILS
    - Saurabh kumar
    - saurabh.dakshana17@gmail.com
```
### Implemented Scans Parsers
 - Add Kiuwan scan Importer ........................................................................[ [#1118][Ad1] ] - merged
    - Scan parser is done.
    - Unittest is done.
 - Add Openscap scan Importer ..................................................................[ [#1193][Ad2] ] - merged
    - Scan parser is done.
    - Unittest is done.
 - Add Wapiti scan Importer ........................................................................[ [#1206][Ad3] ] - merged
    - Scan parser is done.
    - Unittest is done.
 - Add Cobalt.io scan Importer ...............................................................[ [#1215][Ad4] ] - merged
    - Scan parser is done.
    - Unittest is done.
 - Add Mozilla Observatory scan importer .................................[ [#1226][Ad5] ] - merged
    - Scan parser is done.
    - Unittest is done.
 - Add Whitesource Importer ........................................................................[ [#1243][Ad6] ] - merged
    - Scan parser is done.
    - Unittest is done.
 - Add Microfocus Webinspect Importer ..........................................[ [#1268][Ad7] ] - merged 
    - Scan parser is done.
    - Unittest is done.
 - Add Wpscan Importer .......................................................................................[ [#1345][Ad8] ] - merged
    - Scan parser is done.
    - Unittest is done.
- Add Sslscan Importer ....................................................................................[ [#1351][Ad9] ] - merged
    - Scan parser is done.
    - Unitest is done.
- Add Sslyze Scan Importer ........................................................................[ [#1376][Ad10] ] - merged
    - Scan parser is done.
    - Unittest is done.
- Add Testssl Scan Importer .....................................................................[ [#1397][Ad11] ] - merged
    - Scan parser is done.
    - Unittest is done.

### Fixed issues
 - Fix Kiuwan CWE issue ....................................................................................[ [#1175][Ad12] ] - merged
 - Fix Repo field ......................................................................................................[ [#1177][Ad13] ] - merged
 - Add cve option in findings ..................................................................[ [#1106][Ad14] ] - merged
 - fix product grading .......................................................................................[ [#1082][Ad15] ] - merged
 - fix static and dynamic type finding .......................................[ [#1050][Ad16] ] - merged
 - Fix markdown_render function ............................................................[ [#1049][Ad17] ] - merged
 - Fix #1257 and Unicode error in Contrast importer [ [#1260][Ad18] ] - merged
 - fix ssllabs scanner issue if suites not provided [ [#1367][Ad19] ] - merged
 - fix status column to show under review option .........[ [#1373][Ad20] ] - merged
 - Veracode fix static and dynamic issue .................................[ [#1377][Ad21] ] - merged
 - Include tags in reports ...........................................................................[ [#1400][Ad22] ] - merged
 - Fix user edit form to remove products .................................[ [#1420][Ad23] ] - merged
 - Add current commit hash in footer .............................................[ [#1440][Ad24] ] - merged
 - Fix Dependency parser .................................................................................[ [#1455][Ad25] ] - merged
 
### Implemented Unittests
 - Add product type Unittests ..................................................................[ [#1153][Ad26] ]  - merged
 - Add Engagement Unittests ........................................................................[ [#1170][Ad27] ]  - merged
 - Add Environment Unittests .....................................................................[ [#1181][Ad28] ]  - merged

### Todos
 - Add new image and select from existing images inside the finding editor     - [ [#1354][Ad29] ]
 - API v2: Add ability to deal with findings through tags - [ [#1340][Ad30] ]
 - Fix permission handling of users.
 - 

   [Ad1]: <https://github.com/DefectDojo/django-DefectDojo/pull/1118>
   [Ad2]: <https://github.com/DefectDojo/django-DefectDojo/pull/1193>
   [Ad3]: <https://github.com/DefectDojo/django-DefectDojo/pull/1206>
   [Ad4]: <https://github.com/DefectDojo/django-DefectDojo/pull/1215>
   [Ad5]: <https://github.com/DefectDojo/django-DefectDojo/pull/1226>
   [Ad6]: <https://github.com/DefectDojo/django-DefectDojo/pull/1243>
   [Ad7]: <https://github.com/DefectDojo/django-DefectDojo/pull/1268>
   [Ad8]: <https://github.com/DefectDojo/django-DefectDojo/pull/1345>
   [Ad9]: <https://github.com/DefectDojo/django-DefectDojo/pull/1351>
   [Ad10]: <https://github.com/DefectDojo/django-DefectDojo/pull/1376>
   [Ad11]: <https://github.com/DefectDojo/django-DefectDojo/pull/1397>
   [Ad12]: <https://github.com/DefectDojo/django-DefectDojo/pull/1175>
   [Ad13]: <https://github.com/DefectDojo/django-DefectDojo/pull/1177>
   [Ad14]: <https://github.com/DefectDojo/django-DefectDojo/pull/1106>
   [Ad15]: <https://github.com/DefectDojo/django-DefectDojo/pull/1082>
   [Ad16]: <https://github.com/DefectDojo/django-DefectDojo/pull/1050>
   [Ad17]: <https://github.com/DefectDojo/django-DefectDojo/pull/1049>
   [Ad18]: <https://github.com/DefectDojo/django-DefectDojo/pull/1260>
   [Ad19]: <https://github.com/DefectDojo/django-DefectDojo/pull/1367>
   [Ad20]: <https://github.com/DefectDojo/django-DefectDojo/pull/1373>
   [Ad21]: <https://github.com/DefectDojo/django-DefectDojo/pull/1377>
   [Ad22]: <https://github.com/DefectDojo/django-DefectDojo/pull/1400>
   [Ad23]: <https://github.com/DefectDojo/django-DefectDojo/pull/1420>
   [Ad24]: <https://github.com/DefectDojo/django-DefectDojo/pull/1440>
   [Ad25]: <https://github.com/DefectDojo/django-DefectDojo/pull/1455>
   [Ad26]: <https://github.com/DefectDojo/django-DefectDojo/pull/1153>
   [Ad27]: <https://github.com/DefectDojo/django-DefectDojo/pull/1170>
   [Ad28]: <https://github.com/DefectDojo/django-DefectDojo/pull/1181>
   [Ad29]: <https://github.com/DefectDojo/django-DefectDojo/pull/1354>
   [Ad30]: <https://github.com/DefectDojo/django-DefectDojo/pull/1340>
   

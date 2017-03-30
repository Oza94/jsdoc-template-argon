## Duplicate records

In some cases (that we need to identify) JSDoc produce duplicate records of class declarations. To avoid showing duplicate symbols in navigations, this template will ignore multiple classes declarations if all these conditions match :

 * Longname is the same as a previous record
 * Filename is the same as a previous record
 * Lineno is the sdame as a previous record

Its very unlikely that this behavior cause issues with you code but do not hesitate to post issue in this case.

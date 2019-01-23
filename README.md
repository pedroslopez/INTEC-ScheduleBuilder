# INTEC-ScheduleBuilder

This node app uses a genetic algorithm to come up with a schedule based on the user's preferences without time conflicts, using a scraped JSON representation of INTEC's class offering as published in the web portal. An example of the offering format can be found in [oferta.json](./oferta.json).

**NOTE: Configuration is currently done right in the app.js file. Ideally, this should be exposed as a CLI.**

### Class and Preference specification
The desired selection is specified as an array of objects of the following format...

```{code: "CBM203", section: ["06", "08"]}```

...where `code` represents the class code and the `section` array a list of preferred sections.

The section array is optional, and if not specified the schedule builder will select from any of the available sections.
Specifying a single section in the array can be used to force a specific section.

### Parameters
These constants are defined in [app.js](./app.js), right after the desired selection array.

- `mutationRate` - this is used to randomly swap sections from a specific class in a proposed schedule. This is used to introduce some variance into the system in case it gets stuck.

- `popMax` - the amount of potential schedules that will be generated

- `maxGenerations` - maximum amount of iterations to go through before execution is stopped and the best schedule to date is returned. This is usually reached when there are no possible combinations of the specified sections where a scheduling conflict cannot be avoided. 

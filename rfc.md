We need to be able to regenerate versions from snapshots. As documents is aim to change over time (location or filters) we can't rely on the last version of the declaration to regenerate the version from an old snapshot. So we need a system to keep track of declaration changes, that's what we called **declarations and filters versioning**.

At this time, we see three solutions which have in common the following rules:
 - `history` is optional
 - the current valid declaration has no date and should be clearly identifiable
 - the `valid_until` date is an expiration date. It should be the exact authored date of the commit of last snapshot for which the declaration is valid

## Option 1: Add an `history` field in service declaration

In `services/ASKfm.json`:
```
{
  "name": "ASKfm",
  "documents": {
    "Terms of Service": {
      "fetch": "https://ask.fm/docs/terms_of_use/?lang=en",
      "select": ".selection",
      "filter": [ "add" ]
      "history": [
        {
          "fetch": "https://ask.fm/docs/terms_of_use/?lang=en",
          "select": "body",
          "filter": [ "add" ]
          "valid_until": "2020-08-24T14:02:39Z"
        },
        {
          "fetch": "https://ask.fm/docs/terms_of_use/?lang=en",
          "select": "body",
          "valid_until": "2020-08-23T14:02:39Z"
        }
      ]
    }
  }
}
```

Note: When no historisation is needed the file may have no mention of history.

**Pros:**
- Everything is in the same file:
    - might prevent to forget to update existing history
    - might help user to know that history is a thing and encourage them to learn about it if they feel the need
    - no (pseudo-)hidden knowledge about history

**Cons:**
- Apparent complexity can discourage new contributors
- With time, the file can become huge

## Option 2: Add an `serviceId.history.json` file

In `services/ASKfm.json`:
```
{
  "name": "ASKfm",
  "documents": {
    "Terms of Service": {
      "fetch": "https://ask.fm/docs/terms_of_use/?lang=en",
      "select": ".selection",
      "filter": [ "add" ]
    }
  }
}
```

In `services/ASKfm.history.json`:
```
{
  "name": "ASKfm",
  "documents": {
    "Terms of Service": [
      {
        "fetch": "https://ask.fm/docs/terms_of_use/?lang=en",
        "select": "body",
        "filter": [ "add" ]
        "valid_until": "2020-08-24T14:02:39Z"
      },
      {
        "fetch": "https://ask.fm/docs/terms_of_use/?lang=en",
        "select": "body",
        "valid_until": "2020-08-23T14:02:39Z"
      }
    ]
  }
}
```

**Pros:**
 - Service declaration stay small and simple
 - History file is kept close to the service declaration so users might see them

**Cons:**
 - Make the discovery of history capacities less easy
 - Increase the probability of forgetting to update history file when making a change in the service discovery


## Option 3: Add an history service declaration file in `services/history` folder

In `services/ASKfm.json`:
```
{
  "name": "ASKfm",
  "documents": {
    "Terms of Service": {
      "fetch": "https://ask.fm/docs/terms_of_use/?lang=en",
      "select": ".selection",
      "filter": [ "add" ]
    }
  }
}
```

In `services/history/ASKfm.json`:
```
{
  "name": "ASKfm",
  "documents": {
    "Terms of Service": [
      {
        "fetch": "https://ask.fm/docs/terms_of_use/?lang=en",
        "select": "body",
        "filter": [ "add" ]
        "valid_until": "2020-08-24T14:02:39Z"
      },
      {
        "fetch": "https://ask.fm/docs/terms_of_use/?lang=en",
        "select": "body",
        "valid_until": "2020-08-23T14:02:39Z"
      }
    ]
  }
}
```

**Pros:**
 - Service declaration stay small and simple
 - All history updates are reserved to users with the knowledge that might work as gatekeepers

**Cons:**
 - All history updates are reserved to users with the knowledge that might work as gatekeepers :)
 - Need to rely on people with knowledge to keep the history

## Some thoughts

### community

The choice might have implication on the community that will grow around the project.

*Option 1* shows everything to everyone, it might frightened some contributors with some apparent complexity (once there are history in the declaration file), but it might also encourage them to learn about it if they want or feel the need to. All contributors will share the same view and knowledge about the system. This might encourage collaboration between them to learn and improve together.

*Option 2* and *Option 3* hide the complexity of history management in separate files and only most adventurous contributors will find them by themselves. Contribution to those files will probably be done by specific contributors that will be taught to manage those file. Thus creating two different kind of contributors: those who will stay with the basic service declaration, not knowing that more complex options exist, and those who will have the knowledge of history management whose work might stay in the shadow or work as gatekeeper.
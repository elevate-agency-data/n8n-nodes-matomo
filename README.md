# n8n-nodes-matomo  

This is an n8n community node. It lets you interact with Matomo in your n8n workflows.  

Matomo is an open-source analytics platform used to track website and application traffic, analyze visitor behavior, measure conversions (Goals, Funnels, E-commerce), view heatmaps and session recordings, and generate detailed reports on SEO and marketing acquisition channels.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.  

[Installation](#installation)  
[Credentials](#credentials)    
[Operations](#operations)   
[Using as a Tool](#using-as-a-tool)  
[Compatibility](#compatibility)  
[Resources](#resources)  

## Installation  

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.  

Alternatively, you can manually install it:  

```sh  
git clone https://github.com/elevate-agency-data/n8n-nodes-matomo.git 
cd n8n-nodes-matomo 
npm install  
```  

Then, place the node file in the `~/.n8n/custom-nodes` directory (or follow instructions specific to your n8n installation).   

## Credentials  

To use this node, you need an Matomo API key with access to Matomo.  

## Operations  

This node supports the following operations within Matomo:  

* **AB Testing**
    - Adds experiment
    - Archives experiment
    - Deletes experiment
    - Finishes experiment
    - Gets active experiments
    - Gets all experiments
    - Gets available statuses
    - Gets available success metrics
    - Gets available target attributes
    - Gets experiment
    - Gets experiments by statuses
    - Gets experiments with reports
    - Gets JS experiment template
    - Gets JS include template
    - Gets metric details
    - Gets metrics overview
    - Starts experiment
    - Updates experiment
* **Action**
    - Gets actions
    - Gets download
    - Gets downloads
    - Gets entry page titles
    - Gets entry page URLs
    - Gets exit page titles
    - Gets exit page URLs
    - Gets outlink
    - Gets outlinks
    - Gets page title
    - Gets page titles
    - Gets page titles following site search
    - Gets page URL
    - Gets page URLs
    - Gets page URLs following site search
    - Gets site search categories
    - Gets site search keywords
    - Gets site search no result keywords
* **Activity Log**
    - Gets all activity types
    - Gets entries
    - Gets entry count
* **Advertising Conversion Export**
    - Adds conversion export
    - Deletes conversion export
    - Gets conversion export
    - Gets conversion exports
    - Regenerates access token
    - Updates conversion export
* **Annotation**
    - Adds annotation
    - Deletes all annotations
    - Deletes annotation
    - Gets all annotations
    - Gets annotation
    - Gets annotation count for dates
    - Saves annotation
* **API**
    - Gets generic API report
    - Gets glossary metrics
    - Gets glossary reports
    - Gets IP from header
    - Gets matomo version
    - Gets metadata
    - Gets pages comparisons disabled for
    - Gets PHP version
    - Gets plugin activation
    - Gets processed report
    - Gets report metadata
    - Gets report pages metadata
    - Gets row evolution
    - Gets segments metadata
    - Gets settings
    - Gets suggested values for segment
    - Gets widget metadata
* **Connect Account**
    - Creates Matomo tag
    - Gets GTM containers list
    - Gets GTM workspace list
* **Content**
    - Gets content names
    - Gets content pieces
* **Core Admin Home**
    - Deletes all tracking failures
    - Deletes tracking failure
    - Gets tracking failures
* **Crash**
    - Gets all crash messages
    - Gets all crashes
    - Gets crash data
    - Gets crash groups
    - Gets crash messages
    - Gets crash summary
    - Gets crash types
    - Gets crash visit context
    - Gets crashes by category
    - Gets crashes by first party
    - Gets crashes by page title
    - Gets crashes by page URL
    - Gets crashes by source
    - Gets crashes by third party
    - Gets crashes for category
    - Gets crashes for page title
    - Gets crashes for page URL
    - Gets crashes for source
    - Gets disappeared crashes
    - Gets ignored crashes
    - Gets last crashes overview
    - Gets last disappeared crashes
    - Gets last new crashes
    - Gets last reappeared crashes
    - Gets last top crashes
    - Gets new crashes
    - Gets reappeared crashes
    - Gets unidentified crash messages
    - Merges crashes
    - Searches crash messages for merge
    - Sets ignore crash
    - Unmerges crash group
* **Custom Alert**
    - Adds alert
    - Deletes alert
    - Edits alert
    - Gets alert
    - Gets alerts
    - Gets triggered alerts
    - Gets values for alert in past
* **Custom Dimension**
    - Configures existing custom dimension
    - Configures new custom dimension
    - Gets available extraction dimensions
    - Gets available scopes
    - Gets configured custom dimensions
    - Gets configured custom dimensions having scope
    - Gets custom dimension
* **Custom JS Tracker**
    - Does include plugin trackers automatically
* **Custom Report**
    - Adds custom report
    - Deletes custom report
    - Duplicates custom report
    - Gets available categories
    - Gets available dimensions
    - Gets available metrics
    - Gets available report types
    - Gets configured report
    - Gets configured reports
    - Gets custom report
    - Pauses custom report
    - Resumes custom report
    - Updates custom report
* **Custom Variable**
    - Gets custom variables
    - Gets custom variables values from name id
    - Gets usages of slots
* **Dashboard**
    - Copies dashboard to user
    - Creates new dashboard for user
    - Gets dashboards
    - Removes dashboard
    - Resets dashboard layout
* **Device Plugin**
    - Gets plugin
* **Devices Detection**
    - Gets browser engines
    - Gets browser versions
    - Gets browsers
    - Gets device brand
    - Gets device model
    - Gets device type
    - Gets operating system families
    - Gets operating system versions
* **Event**
    - Gets action from category ID
    - Gets action from name ID
    - Gets category from action ID
    - Gets category from name ID
    - Gets event action
    - Gets event category
    - Gets event name
    - Gets name from action ID
    - Gets name from category ID
* **Feedback**
    - Sends feedback for feature
    - Sends feedback for survey
    - Updates feedback reminder date
* **Form**
    - Adds form
    - Archives form
    - Deletes form
    - Gets all goals
    - Gets auto creation settings
    - Gets available conversion rule options
    - Gets available form rules
    - Gets available page rules
    - Gets available statuses
    - Gets counters
    - Gets current most popular forms
    - Gets drop off fields
    - Gets entry fields
    - Gets field corrections
    - Gets field size
    - Gets field timings
    - Gets form
    - Gets form analytics
    - Gets forms
    - Gets forms by statuses
    - Gets most used fields
    - Gets page URLs
    - Gets unneeded fields
    - Updates form
    - Updates form field display name
* **Funnel**
    - Deletes goal funnel
    - Deletes non-goal funnel
    - Gets all activated funnels for site
    - Gets available pattern matches
    - Gets funnel
    - Gets funnel entries
    - Gets funnel exits
    - Gets funnel flow
    - Gets funnel flow table
    - Gets funnel metrics
    - Gets funnel step subtable
    - Gets goal funnel
    - Gets sales funnel for site
    - Has any activated funnel for site
    - Saves non-goal funnel
    - Sets goal funnel
    - Tests URL matches steps
* **Goal**
    - Adds goal
    - Deletes goal
    - Gets days to conversion
    - Gets goal
    - Gets goal metrics
    - Gets goals
    - Gets items category
    - Gets items name
    - Gets items SKU
    - Gets visits until conversion
    - Updates goal
* **Heatmap Session Recording**
    - Adds heatmap
    - Adds session recording
    - Deletes heatmap
    - Deletes heatmap screenshot
    - Deletes recorded pageview
    - Deletes recorded session
    - Deletes session recording
    - Duplicates heatmap
    - Ends heatmap
    - Ends session recording
    - Gets available device types
    - Gets available heatmap types
    - Gets available session recording sample limits
    - Gets available statuses
    - Gets available target page rules
    - Gets embed session info
    - Gets event types
    - Gets heatmap
    - Gets heatmaps
    - Gets recorded heatmap
    - Gets recorded heatmap metadata
    - Gets recorded session
    - Gets recorded sessions
    - Gets session recording
    - Gets session recordings
    - Pauses heatmap
    - Pauses session recording
    - Resumes heatmap
    - Resumes session recording
    - Tests URL match pages
    - Updates heatmap
    - Updates session recording
* **Image Graph**
    - Generates static image graph
* **Insight**
    - Can generate insights
    - Gets insights
    - Gets insights overview
    - Gets movers and shakers
    - Gets movers and shakers overview
* **Languages Manager**
    - Checks if 12-hour clock is used
    - Checks language availability
    - Gets available language names
    - Gets available languages
    - Gets available languages info
    - Gets language for user
    - Gets translations for language
    - Sets 12-hour clock for user
    - Sets language for user
* **Live**
    - Checks visitor profile
    - Gets last visit details
    - Gets most recent visitor id
    - Gets most recent visits date and time
    - Gets visit counters
    - Gets visitor profile
* **Login**
    - Unblocks brute force IPs
* **Marketing Campaigns Reporting**
    - Gets campaign content
    - Gets campaign group
    - Gets campaign ID
    - Gets campaign keyword
    - Gets campaign medium
    - Gets campaign name
    - Gets campaign name from source medium ID
    - Gets campaign placement
    - Gets campaign source
    - Gets campaign source and medium
    - Gets keyword content
* **Media**
    - Checks if media records exist
    - Gets audio hours
    - Gets audio resources
    - Gets audio titles
    - Gets current most plays
    - Gets current number of plays
    - Gets current sum time spent
    - Gets grouped audio resources
    - Gets grouped video resources
    - Gets media analytics
    - Gets players
    - Gets video hours
    - Gets video resolutions
    - Gets video resources
    - Gets video titles
* **Mobile Messaging**
    - Adds phone number
    - Checks if SMS API credentials are provided
    - Deletes SMS API credential
    - Gets delegated management
    - Gets phone numbers
    - Gets SMS credit left
    - Gets SMS provider
    - Removes phone number
    - Resends verification code
    - Sets delegated management
    - Sets SMS API credentials
    - Validates phone number
* **Multi Channel Conversion Attribution**
    - Gets available campaign dimension combinations
    - Gets channel attribution
    - Gets goal attribution
    - Gets site attribution goals
    - Sets goal attribution
* **Multi Site**
    - Gets all sites
    - Gets all sites with groups
    - Gets one site
* **Overlay**
    - Gets following pages
    - Gets translations
* **Page Performance**
    - Gets page performance
* **Privacy Manager**
    - Anonymizes raw data
    - Deletes data subjects
    - Exports data subjects
    - Finds data subjects
    - Gets available link visit action columns to anonymize
    - Gets available visit columns to anonymize
* **Referrer**
    - Gets AI assistants
    - Gets all referrers
    - Gets campaigns
    - Gets keywords
    - Gets keywords from campaign ID
    - Gets keywords from search engine ID
    - Gets number of distinct AI assistants
    - Gets number of distinct campaigns
    - Gets number of distinct keywords
    - Gets number of distinct search engines
    - Gets number of distinct social networks
    - Gets number of distinct website URLs
    - Gets number of distinct websites
    - Gets referrer type
    - Gets referrers
    - Gets search engines
    - Gets search engines from keyword ID
    - Gets socials
    - Gets URLs for AI assistant
    - Gets URLs for social
    - Gets URLs from website ID
    - Gets websites
* **Resolution**
    - Gets configuration
    - Gets resolution
* **Roll Up Reporting**
    - Adds roll-up
    - Gets roll-ups
    - Updates roll-up
* **Scheduled Report**
    - Adds scheduled report
    - Deletes scheduled report
    - Generates scheduled report
    - Gets scheduled reports
    - Sends scheduled report
    - Updates scheduled report
* **Search Engine Keywords Performance**
    - Gets Bing crawling error examples
    - Gets Bing crawling overview
    - Gets Bing keywords
    - Gets Google image keywords
    - Gets Google keywords
    - Gets Google news keywords
    - Gets Google video keywords
    - Gets Google web keywords
    - Gets imported keywords
    - Gets search engine keywords
    - Gets Yandex crawling overview
    - Gets Yandex keywords
* **Segment Editor**
    - Adds segment
    - Checks if user can add segment
    - Deletes segment
    - Gets all segments
    - Gets segment
    - Updates segment
* **SEO**
    - Gets rank
* **Sites Manager**
    - Adds site
    - Adds site alias URLs
    - Checks if timezone support is enabled
    - Deletes site
    - Gets all sites
    - Gets all sites IDs
    - Gets currency list
    - Gets currency symbols
    - Gets default currency
    - Gets default timezone
    - Gets excluded query parameters
    - Gets excluded referrers
    - Gets exclusion type for query parameters
    - Gets global excluded IPs
    - Gets global excluded query parameters
    - Gets global excluded referrers
    - Gets global excluded user agents
    - Gets global search category parameters
    - Gets global search keyword parameters
    - Gets global URL fragments setting
    - Gets image tracking code
    - Gets IPs for range
    - Gets JavaScript tag
    - Gets number of websites per page
    - Gets pattern match sites
    - Gets site from ID
    - Gets site IDs from site URL
    - Gets site IDs with admin access
    - Gets site IDs with at least view access
    - Gets site IDs with view access
    - Gets site IDs with write access
    - Gets site settings
    - Gets site URLs from ID
    - Gets sites from group
    - Gets sites groups
    - Gets sites with admin access
    - Gets sites with at least view access
    - Gets sites with minimum access
    - Gets sites with view access
    - Gets timezone name
    - Gets timezones list
    - Gets unique site timezones
    - Renames site group
    - Sets default currency
    - Sets default timezone
    - Sets global excluded IPs
    - Sets global excluded referrers
    - Sets global excluded user agents
    - Sets global query param exclusion
    - Sets global search parameters
    - Sets global URL fragments setting
    - Sets site alias URLs
    - Updates site
* **Tag Manager**
    - Adds container
    - Adds container tag
    - Adds container trigger
    - Adds container variable
    - Changes debug URL
    - Creates container version
    - Creates default container for site
    - Deletes container
    - Deletes container tag
    - Deletes container trigger
    - Deletes container variable
    - Deletes container version
    - Disables preview mode
    - Enables preview mode
    - Exports container version
    - Gets available comparisons
    - Gets available container variables
    - Gets available contexts
    - Gets available environments
    - Gets available environments with publish capability
    - Gets available tag fire limits
    - Gets available tag types in context
    - Gets available trigger types in context
    - Gets available variable types in context
    - Gets container
    - Gets container embed code
    - Gets container install instructions
    - Gets container tag
    - Gets container tags
    - Gets container trigger
    - Gets container trigger references
    - Gets container triggers
    - Gets container variable
    - Gets container variable references
    - Gets container variables
    - Gets container version
    - Gets container versions
    - Gets containers
    - Imports container version
    - Pauses container tag
    - Publishes container version
    - Resumes container tag
    - Updates container
    - Updates container tag
    - Updates container trigger
    - Updates container variable
    - Updates container version
* **Tour**
    - Gets challenges
    - Gets tour level
    - Skips challenge
* **Transition**
    - Checks if period is allowed
    - Gets transitions for action
    - Gets transitions for page title
    - Gets transitions for page URL
    - Gets translations
* **Two Factor Auth**
    - Resets two factor authentication
* **User Country**
    - Gets city data
    - Gets continent data
    - Gets country code mapping
    - Gets country data
    - Gets location from IP
    - Gets number of distinct countries
    - Gets region data
    - Sets location provider
* **User ID**
    - Gets users
* **Users Flow**
    - Gets available data sources
    - Gets interaction actions
    - Gets users flow
    - Gets users flow pretty
* **Users Manager**
    - Adds capabilities
    - Adds user
    - Checks if user email exists
    - Checks if user exists
    - Checks if user has super user access
    - Deletes user
    - Gets available capabilities
    - Gets available roles
    - Gets sites access for user
    - Gets sites access from user
    - Gets user
    - Gets user by email
    - Gets user login
    - Gets user login from user email
    - Gets user preference
    - Gets users
    - Gets users access from site
    - Gets users from site access
    - Gets users with roles
    - Gets users with site access
    - Gets users with super user access
    - Invites user
    - Sets super user access
    - Sets user access
    - Sets user preference
    - Updates user
* **Visit Frequency**
    - Gets visit frequency data
* **Visit Time**
    - Gets visit data by day of week
    - Gets visit information per local time
    - Gets visit information per server time
* **Visitor Interest**
    - Gets visits by days since last
    - Gets visits by visit count
    - Gets visits per duration
    - Gets visits per page
* **Visits Summary**
    - Gets actions data
    - Gets bounce count
    - Gets converted visits
    - Gets core web metrics
    - Gets max actions
    - Gets total visits length
    - Gets total visits length pretty
    - Gets unique visitors
    - Gets user data
    - Gets visits data

Retrieve information from the [Matomo API](https://developer.matomo.org/api-reference/reporting-api). 

## Using as a Tool

This node can be used as a tool in n8n AI Agents. To enable community nodes as tools, you need to set the `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE` environment variable to `true`.

### Setting the Environment Variable

**If you're using a bash/zsh shell:**
```bash
export N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true
n8n start
```

**If you're using Docker:**
Add to your docker-compose.yml file:
```yaml
environment:
  - N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true
```

**If you're using the desktop app:**
Create a `.env` file in the n8n directory:
```
N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true
```

**If you want to set it permanently on Mac/Linux:**
Add to your `~/.zshrc` or `~/.bash_profile`:
```bash
export N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true
```

## Compatibility  

- Tested with: 1.116.2 (Success)

## Resources  

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)  
- [Matomo API documentation](https://developer.matomo.org/api-reference/reporting-api)
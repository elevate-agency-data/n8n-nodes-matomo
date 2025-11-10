import { 
	ApplicationError,
	INodeType, 
	INodeTypeDescription, 
	IExecuteFunctions, 
	NodeApiError,
  NodeConnectionTypes,
	NodeOperationError
} from 'n8n-workflow';

export class Matomo implements INodeType {
	description: INodeTypeDescription = {
		name: 'matomo',
		displayName: 'Matomo',
		group: ['transform'],
		version: 1,
		description: 'Use the Matomo API',
    defaults:{ name: 'Matomo' },
		icon: 'file:matomo.svg',
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],        
		usableAsTool: true,
		credentials: [{	name: 'matomoApi', required: true}],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
          { name: 'AB Testing', value: 'abTesting', description: 'Manage AB testing module' },
          { name: 'Action', value: 'action', description: 'Manage actions module' },
          { name: 'Activity Log', value: 'activityLog', description: 'Manage activity log module' },
          { name: 'Advertising Conversion Export', value: 'advertisingConversionExport', description: 'Manage advertising conversion exportsmodule' },
          { name: 'Annotation', value: 'annotation', description: 'Manage annotationsmodule' },
          { name: 'API', value: 'api', description: 'Manage API module' },
          { name: 'Connect Account', value: 'connectAccount', description: 'Manage connect accounts module' },
          { name: 'Content', value: 'content', description: 'Manage contents module' },
          { name: 'Core Admin Home', value: 'coreAdminHome', description: 'Manage core admin home module' },
          { name: 'Crash', value: 'crash', description: 'Manage crash analytics module' },
          { name: 'Custom Alert', value: 'customAlert', description: 'Manage custom alerts module' },
          { name: 'Custom Dimension', value: 'customDimension', description: 'Manage custom dimensions module' },
          { name: 'Custom JS Tracker', value: 'customJsTracker', description: 'Manage custom JS tracker module' },
          { name: 'Custom Report', value: 'customReport', description: 'Manage custom reports module' },
          { name: 'Custom Variable', value: 'customVariable', description: 'Manage custom variables module' },
          { name: 'Dashboard', value: 'dashboard', description: 'Manage dashboard module' },
          { name: 'Device Plugin', value: 'devicePlugin', description: 'Manage device plugins module' },
          { name: 'Devices Detection', value: 'devicesDetection', description: 'Manage devices detection module' },
          { name: 'Event', value: 'event', description: 'Manage events module' },
          { name: 'Feedback', value: 'feedback', description: 'Manage feedback module' },
          { name: 'Form', value: 'form', description: 'Manage form analytics module' },
          { name: 'Funnel', value: 'funnel', description: 'Manage funnels module' },
          { name: 'Goal', value: 'goal', description: 'Manage goals module' },
          { name: 'Heatmap Session Recording', value: 'heatmapSessionRecording', description: 'Manage heatmap session recording module' },
          { name: 'Image Graph', value: 'imageGraph', description: 'Manage image graphs module' },
          { name: 'Insight', value: 'insight', description: 'Manage insights module' },
          { name: 'Languages Manager', value: 'languagesManager', description: 'Manage languages manager module' },
          { name: 'Live', value: 'live', description: 'Manage live module' },
          { name: 'Login', value: 'login', description: 'Manage login module' },
          { name: 'Marketing Campaigns Reporting', value: 'marketingCampaignsReporting', description: 'Manage marketing campaigns reporting module' },
          { name: 'Media', value: 'media', description: 'Manage media analytics module' },
          { name: 'Mobile Messaging', value: 'mobileMessaging', description: 'Manage mobile messaging module' },
          { name: 'Multi Channel Conversion Attribution', value: 'multiChannelConversionAttribution', description: 'Manage multi channel conversion attribution module' },
          { name: 'Multi Site', value: 'multiSite', description: 'Manage multi-site module' },
          { name: 'Overlay', value: 'overlay', description: 'Manage overlay module' },
          { name: 'Page Performance', value: 'pagePerformance', description: 'Manage page performance module' },
          { name: 'Privacy Manager', value: 'privacyManager', description: 'Manage privacy manager module' },
          { name: 'Referrer', value: 'referrer', description: 'Manage referrers module' },
          { name: 'Resolution', value: 'resolution', description: 'Manage resolution module' },
          { name: 'Roll Up Reporting', value: 'rollUpReporting', description: 'Manage roll up reporting module' },
          { name: 'Scheduled Report', value: 'scheduledReport', description: 'Manage scheduled reports module' },
          { name: 'Search Engine Keywords Performance', value: 'searchEngineKeywordsPerformance', description: 'Manage search engine keywords performance module' },
          { name: 'Segment Editor', value: 'segmentEditor', description: 'Manage segment editor module' },
          { name: 'SEO', value: 'seo', description: 'Manage SEO module' },
          { name: 'Sites Manager', value: 'sitesManager', description: 'Manage sites manager module' },
          { name: 'Tag Manager', value: 'tagManager', description: 'Manage tag manager module' },
          { name: 'Tour', value: 'tour', description: 'Manage tour module' },
          { name: 'Transition', value: 'transition', description: 'Manage transitions module' },
          { name: 'Two Factor Auth', value: 'twoFactorAuth', description: 'Manage two factor auth module' },
          { name: 'User Country', value: 'userCountry', description: 'Manage user country module' },
          { name: 'User ID', value: 'userId', description: 'Manage user ID module' },
          { name: 'Users Flow', value: 'usersFlow', description: 'Manage users flow module' },
          { name: 'Users Manager', value: 'usersManager', description: 'Manage users manager module' },
          { name: 'Visit Frequency', value: 'visitFrequency', description: 'Manage visit frequency module' },
          { name: 'Visit Time', value: 'visitTime', description: 'Manage visit tim modulee' },
          { name: 'Visitor Interest', value: 'visitorInterest', description: 'Manage visitor interest module' },
          { name: 'Visits Summary', value: 'visitsSummary', description: 'Manage visits summary module' },
      ],
				default: 'abTesting',
				required: true,
			},
			{
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['abTesting'] } },
        options: [
            { name: 'Add Experiment', value: 'abTestingAddExperimentPost', action: 'Adds experiment', description: 'Adds a new A/B test experiment' },
            { name: 'Archive Experiment', value: 'abTestingArchiveExperimentPost', action: 'Archives experiment', description: 'Archives a finished experiment' },
            { name: 'Delete Experiment', value: 'abTestingDeleteExperimentPost', action: 'Deletes experiment', description: 'Deletes a specific experiment for a site' },
            { name: 'Finish Experiment', value: 'abTestingFinishExperimentPost', action: 'Finishes experiment', description: 'Finishes an active A/B experiment' },
            { name: 'Get Active Experiments', value: 'abTestingActiveExperimentsGet', action: 'Gets active experiments', description: 'Gets the list of active experiments for a site' },
            { name: 'Get All Experiments', value: 'abTestingAllExperimentsGet', action: 'Gets all experiments', description: 'Gets the list of all experiments for a site' },
            { name: 'Get Available Statuses', value: 'abTestingAvailableStatusesGet', action: 'Gets available statuses', description: 'Gets the list of statuses available for experiments' },
            { name: 'Get Available Success Metrics', value: 'abTestingAvailableSuccessMetricsGet', action: 'Gets available success metrics', description: 'Gets the success metrics that can be used in experiments' },
            { name: 'Get Available Target Attributes', value: 'abTestingAvailableTargetAttributesGet', action: 'Gets available target attributes', description: 'Gets attributes available for targeting experiments' },
            { name: 'Get Experiment', value: 'abTestingExperimentGet', action: 'Gets experiment', description: 'Gets details for a specific A/B experiment' },
            { name: 'Get Experiments By Statuses', value: 'abTestingExperimentsByStatusesGet', action: 'Gets experiments by statuses', description: 'Gets experiments filtered by status list for a site' },
            { name: 'Get Experiments With Reports', value: 'abTestingExperimentsWithReportsGet', action: 'Gets experiments with reports', description: 'Gets experiments along with their report data for a site' },
            { name: 'Get JS Experiment Template', value: 'abTestingJSExperimentTemplateGet', action: 'Gets JS experiment template', description: 'Gets the JavaScript template for a specific experiment' },
            { name: 'Get JS Include Template', value: 'abTestingJSIncludeTemplateGet', action: 'Gets JS include template', description: 'Gets the JavaScript include template for embedding experiments' },
            { name: 'Get Metric Details', value: 'abTestingMetricDetailsGet', action: 'Gets metric details', description: 'Gets metric details' },
            { name: 'Get Metrics Overview', value: 'abTestingMetricsOverviewGet', action: 'Gets metrics overview', description: 'Gets metrics overview' },
            { name: 'Start Experiment', value: 'abTestingStartExperimentPost', action: 'Starts experiment', description: 'Starts a paused or scheduled experiment' },
            { name: 'Update Experiment', value: 'abTestingUpdateExperimentPost', action: 'Updates experiment', description: 'Updates settings of an existing A/B experiment' }
        ],
        default: 'abTestingAddExperimentPost',
      },
			{
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
          show: { resource: ['action'] }
        },
        options: [
          { name: 'Get Actions', value: 'actionGet', action: 'Gets actions', description: 'Gets all actions for a given site, period, and date' },
          { name: 'Get Download', value: 'actionDownloadGet', action: 'Gets download', description: 'Gets metrics for a specific downloaded file' },
          { name: 'Get Downloads', value: 'actionDownloadsGet', action: 'Gets downloads', description: 'Gets list of downloaded files and metrics' },
          { name: 'Get Entry Page Titles', value: 'actionEntryPageTitlesGet', action: 'Gets entry page titles', description: 'Gets entry pages by title for a given site' },
          { name: 'Get Entry Page URLs', value: 'actionEntryPageUrlsGet', action: 'Gets entry page urls', description: 'Gets list of entry pages for a given site' },
          { name: 'Get Exit Page Titles', value: 'actionExitPageTitlesGet', action: 'Gets exit page titles', description: 'Gets exit pages by title for a given site' },
          { name: 'Get Exit Page URLs', value: 'actionExitPageUrlsGet', action: 'Gets exit page urls', description: 'Gets list of exit pages for a given site' },
          { name: 'Get Outlink', value: 'actionOutlinkGet', action: 'Gets outlink', description: 'Gets metrics for a specific outlink URL' },
          { name: 'Get Outlinks', value: 'actionOutlinksGet', action: 'Gets outlinks', description: 'Gets list of external links (outlinks) clicked by users' },
          { name: 'Get Page Title', value: 'actionPageTitleGet', action: 'Gets page title', description: 'Gets metrics for a specific page title' },
          { name: 'Get Page Titles', value: 'actionPageTitlesGet', action: 'Gets page titles', description: 'Gets all page titles with standard metrics' },
          { name: 'Get Page Titles Following Site Search', value: 'actionPageTitlesFollowingSiteSearchGet', action: 'Gets page titles following site search', description: 'Gets page titles visited after an internal search' },
          { name: 'Get Page URL', value: 'actionPageUrlGet', action: 'Gets page url', description: 'Gets metrics for a specific page URL' },
          { name: 'Get Page URLs', value: 'actionPageUrlsGet', action: 'Gets page urls', description: 'Gets list of all page URLs with metrics' },
          { name: 'Get Page URLs Following Site Search', value: 'actionPageUrlsFollowingSiteSearchGet', action: 'Gets page urls following site search', description: 'Gets page URLs visited after an internal search' },
          { name: 'Get Site Search Categories', value: 'actionSiteSearchCategoriesGet', action: 'Gets site search categories', description: 'Gets search categories and their metrics' },
          { name: 'Get Site Search Keywords', value: 'actionSiteSearchKeywordsGet', action: 'Gets site search keywords', description: 'Gets internal search keywords and metrics' },
          { name: 'Get Site Search No Result Keywords', value: 'actionSiteSearchNoResultKeywordsGet', action: 'Gets site search no result keywords', description: 'Gets search terms that produced no results' }
        ],
        default: 'actionGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['activityLog'] } },
        options: [
          { name: 'Get All Activity Types', value: 'activityLogAllActivityTypesGet', action: 'Gets all activity types', description: 'Gets all available activity types in the activity log'},
          { name: 'Get Entries', value: 'activityLogEntriesGet', action: 'Gets entries', description: 'Gets list of activity log entries for users in Matomo' },
          { name: 'Get Entry Count', value: 'activityLogEntryCountGet', action: 'Gets entry count', description: 'Gets count of activity log entries matching filters' }
        ],
        default: 'activityLogAllActivityTypesGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['advertisingConversionExport'] } },
        options: [
          { name: 'Add Conversion Export', value: 'advertisingConversionExportAddPost', action: 'Adds conversion export', description: 'Adds a new conversion export with specified parameters' },
          { name: 'Delete Conversion Export', value: 'advertisingConversionExportDelete', action: 'Deletes conversion export', description: 'Deletes a specified conversion export for a site' },
          { name: 'Get Conversion Export', value: 'advertisingConversionExportGet', action: 'Gets conversion export', description: 'Gets details of a specific conversion export' },
          { name: 'Get Conversion Exports', value: 'advertisingConversionExportListGet', action: 'Gets conversion exports',description: 'Gets list of conversion exports for a given site' },
          { name: 'Regenerate Access Token', value: 'advertisingConversionExportRegenerateAccessTokenPost', action: 'Regenerates access token', description: 'Regenerates an access token for a specific conversion export' },
          { name: 'Update Conversion Export', value: 'advertisingConversionExportUpdatePost', action: 'Updates conversion export', description: 'Updates details of a specific conversion export (name, type, parameters)' }
        ],
        default: 'advertisingConversionExportAddPost',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['annotation'] } },
        options: [
          { name: 'Add Annotation', value: 'annotationAddPost', action: 'Adds annotation', description: 'Adds a new annotation for a given site and date' },
          { name: 'Delete All Annotations', value: 'annotationAllDelete', action: 'Deletes all annotations', description: 'Deletes all annotations for a site' },
          { name: 'Delete Annotation', value: 'annotationDelete', action: 'Deletes annotation', description: 'Deletes an annotation by note ID' },
          { name: 'Get All Annotations', value: 'annotationAllGet', action: 'Gets all annotations', description: 'Gets all annotations for a site and period' },
          { name: 'Get Annotation', value: 'annotationGet', action: 'Gets annotation', description: 'Gets a single annotation by note ID' },
          { name: 'Get Annotation Count For Dates', value: 'annotationCountForDatesGet', action: 'Gets annotation count for dates', description: 'Gets the number of annotations for each date in a range' },
          { name: 'Save Annotation', value: 'annotationSavePost', action: 'Saves annotation', description: 'Saves (updates) an existing annotation' }
        ],
        default: 'annotationAddPost',
      },
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['api'] } },
				options: [					
					{ name: 'Get Generic API Report', value: 'apiGenericAPIReportGet', action: 'Gets generic API report', description: 'Gets analytics data by calling a specific API method (generic wrapper)' },
					{ name: 'Get Glossary Metrics', value: 'apiGlossaryMetricsGet', action: 'Gets glossary metrics', description: 'Gets glossary metric definitions for a site' },
					{ name: 'Get Glossary Reports', value: 'apiGlossaryReportsGet', action: 'Gets glossary reports', description: 'Gets glossary reports available for a site' },
					{ name: 'Get IP From Header', value: 'apiMatomoIPFromHeaderGet', action: 'Gets IP from header', description: 'Gets IP from header' },
					{ name: 'Get Matomo Version', value: 'apiMatomoVersionGet', action: 'Gets matomo version', description: 'Gets the current matomo version' },
					{ name: 'Get Metadata', value: 'apiMetadataGet', action: 'Gets metadata', description: 'Gets metadata for a specific report (module + action)' },
					{ name: 'Get Pages Comparisons Disabled For', value: 'apiPagesComparisonsDisabledForGet', action: 'Gets pages comparisons disabled for', description: 'Gets pages for which comparisons are disabled' },
					{ name: 'Get PHP Version', value: 'apiPHPVersionGet', action: 'Gets PHP version', description: 'Gets the PHP version used by Matomo' },
					{ name: 'Get Plugin Activation', value: 'apiPluginActivationGet', action: 'Gets plugin activation', description: 'Gets whether a plugin is activated' },
					{ name: 'Get Processed Report', value: 'apiProcessedReportGet', action: 'Gets processed report', description: 'Gets a human-readable processed version of any report (with processed metrics)' },
					{ name: 'Get Report Metadata', value: 'apiReportMetadataGet', action: 'Gets report metadata', description: 'Gets metadata for report pages for a given site' },
					{ name: 'Get Report Pages Metadata', value: 'apiReportPagesMetadataGet', action: 'Gets report pages metadata', description: 'Gets metadata for all available reports (optionally filtered)' },
					{ name: 'Get Row Evolution', value: 'apiRowEvolutionGet', action: 'Gets row evolution', description: 'Gets time-series evolution for a specific row in a report' },
					{ name: 'Get Segments Metadata', value: 'apiSegmentsMetadataGet', action: 'Gets segments metadata', description: 'Gets metadata for segments (for provided sites)' },
					{ name: 'Get Settings', value: 'apiSettingsGet', action: 'Gets settings', description: 'Gets matomo settings' },
					{ name: 'Get Suggested Values For Segment', value: 'apiSuggestedValuesForSegmentGet', action: 'Gets suggested values for segment', description: 'Gets suggested top values to build segments' },
					{ name: 'Get Widget Metadata', value: 'apiWidgetMetadataGet', action: 'Gets widget metadata', description: 'Gets metadata for dashboard widgets for a given site' }
				],
				default: 'apiGenericAPIReportGet',
			},
      {
        displayName: 'Operation',
				name: 'operation',
				type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['connectAccount'] } },
        options: [
          { name: 'Create Matomo Tag', value: 'connectAccountCreateMatomoTagPost', action: 'Creates matomo tag', description: 'Creates a matomo tag in the specified GTM container and workspace' },
          { name: 'Get GTM Containers List', value: 'connectAccountGTMContainersListGet', action: 'Gets GTM containers list', description: 'Gets the list of Google Tag Manager containers for an account' },
          { name: 'Get GTM Workspace List', value: 'connectAccountGTMWorkspaceListGet', action: 'Gets GTM workspace list', description: 'Gets the list of GTM workspaces for a given container' }
        ],
        default: 'connectAccountCreateMatomoTagPost',
      },
      {
        displayName: 'Operation',
				name: 'operation',
				type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['content'] } },
        options: [
          { name: 'Get Content Names', value: 'contentContentNamesGet', action: 'Gets content names', description: 'Gets list of content names for a site and period' },
          { name: 'Get Content Pieces', value: 'contentContentPiecesGet', action: 'Gets content pieces', description: 'Gets list of content pieces and metrics for a site and period' }
        ],
        default: 'contentContentNamesGet',
      },
      {
        displayName: 'Operation',
				name: 'operation',
				type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['coreAdminHome'] } },
        options: [
          { name: 'Delete All Tracking Failures', value: 'coreAdminHomeAllTrackingFailuresDelete', action: 'Deletes all tracking failures', description: 'Deletes all tracking failures for all sites' },
          { name: 'Delete Tracking Failure', value: 'coreAdminHomeTrackingFailureDelete', action: 'Deletes tracking failure', description: 'Deletes a specific tracking failure for a given site' },
          { name: 'Get Tracking Failures', value: 'coreAdminHomeTrackingFailuresGet', action: 'Gets tracking failures', description: 'Gets list of all tracking failures for a given site' }
        ],
        default: 'coreAdminHomeAllTrackingFailuresDelete',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['crash'] } },
        options: [
          { name: 'Get All Crash Messages', value: 'crashAllCrashMessagesGet', action: 'Gets all crash messages', description: 'Gets all crash messages for a given site and period' },
          { name: 'Get All Crashes', value: 'crashAllCrashesGet', action: 'Gets all crashes', description: 'Gets list of all crashes for a given site with specified filters' },
          { name: 'Get Crash Data', value: 'crashCrashDataGet', action: 'Gets crash data', description: 'Gets crash data for a specific site and period' },
          { name: 'Get Crash Groups', value: 'crashCrashGroupsGet', action: 'Gets crash groups', description: 'Gets list of all crash groups for a given site' },
          { name: 'Get Crash Messages', value: 'crashCrashMessagesGet', action: 'Gets crash messages', description: 'Gets crash messages for a given site and period' },
          { name: 'Get Crash Summary', value: 'crashCrashSummaryGet', action: 'Gets crash summary', description: 'Gets a summary of a specific crash log' },
          { name: 'Get Crash Types', value: 'crashCrashTypesGet', action: 'Gets crash types', description: 'Gets types of crashes for a given site' },
          { name: 'Get Crash Visit Context', value: 'crashCrashVisitContextGet', action: 'Gets crash visit context', description: 'Gets visit context details for a specific crash' },
          { name: 'Get Crashes By Category', value: 'crashCrashesByCategoryGet', action: 'Gets crashes by category', description: 'Gets crashes grouped by category for a given site and period' },
          { name: 'Get Crashes By First Party', value: 'crashCrashesByFirstPartyGet', action: 'Gets crashes by first party', description: 'Gets crashes from first party sources for a given site and period' },
          { name: 'Get Crashes By Page Title', value: 'crashCrashesByPageTitleGet', action: 'Gets crashes by page title', description: 'Gets crashes grouped by page title for a given site and period' },
          { name: 'Get Crashes By Page URL', value: 'crashCrashesByPageUrlGet', action: 'Gets crashes by page URL', description: 'Gets crashes grouped by page URL for a given site and period' },
          { name: 'Get Crashes By Source', value: 'crashCrashesBySourceGet', action: 'Gets crashes by source', description: 'Gets crashes grouped by source for a given site and period' },
          { name: 'Get Crashes By Third Party', value: 'crashCrashesByThirdPartyGet', action: 'Gets crashes by third party', description: 'Gets crashes from third party sources for a given site and period' },
          { name: 'Get Crashes For Category', value: 'crashCrashesForCategoryGet', action: 'Gets crashes for category', description: 'Gets crashes for a specific category for a given site and period' },
          { name: 'Get Crashes For Page Title', value: 'crashCrashesForPageTitleGet', action: 'Gets crashes for page title', description: 'Gets crashes for a specific page title for a given site and period' },
          { name: 'Get Crashes For Page URL', value: 'crashCrashesForPageUrlGet', action: 'Gets crashes for page URL', description: 'Gets crashes for a specific page URL for a given site and period' },
          { name: 'Get Crashes For Source', value: 'crashCrashesForSourceGet', action: 'Gets crashes for source', description: 'Gets crashes for a specific source for a given site and period' },
          { name: 'Get Disappeared Crashes', value: 'crashDisappearedCrashesGet', action: 'Gets disappeared crashes', description: 'Gets list of crashes that have disappeared for a given site and period' },
          { name: 'Get Ignored Crashes', value: 'crashIgnoredCrashesGet', action: 'Gets ignored crashes', description: 'Gets list of crashes that are marked as ignored' },
          { name: 'Get Last Crashes Overview', value: 'crashLastCrashesOverviewGet', action: 'Gets last crashes overview', description: 'Gets overview of the last crashes in the past 30 minutes' },
          { name: 'Get Last Disappeared Crashes', value: 'crashLastDisappearedCrashesGet', action: 'Gets last disappeared crashes', description: 'Gets disappeared crashes from the last 30 minutes with a specified limit' },
          { name: 'Get Last New Crashes', value: 'crashLastNewCrashesGet', action: 'Gets last new crashes', description: 'Gets new crashes from the last 30 minutes with a specified limit' },
          { name: 'Get Last Reappeared Crashes', value: 'crashLastReappearedCrashesGet', action: 'Gets last reappeared crashes', description: 'Gets reappeared crashes from the last 30 minutes with a specified limit' },
          { name: 'Get Last Top Crashes', value: 'crashLastTopCrashesGet', action: 'Gets last top crashes', description: 'Gets top crashes from the last 30 minutes with a specified limit' },
          { name: 'Get New Crashes', value: 'crashNewCrashesGet', action: 'Gets new crashes', description: 'Gets list of new crashes for a given site and period' },
          { name: 'Get Reappeared Crashes', value: 'crashReappearedCrashesGet', action: 'Gets reappeared crashes', description: 'Gets list of crashes that have reappeared for a given site and period' },
          { name: 'Get Unidentified Crash Messages', value: 'crashUnidentifiedCrashMessagesGet', action: 'Gets unidentified crash messages', description: 'Gets crash messages that are unidentified for a given site and period' },
          { name: 'Merge Crashes', value: 'crashMergeCrashesPost', action: 'Merges crashes', description: 'Merges crash logs into one group' },
          { name: 'Search Crash Messages For Merge', value: 'crashSearchCrashMessagesForMergePost', action: 'Searches crash messages for merge', description: 'Searches crash messages for merge based on given search term and filters' },
          { name: 'Set Ignore Crash', value: 'crashSetIgnoreCrashPost', action: 'Sets ignore crash', description: 'Sets whether a specific crash should be ignored' },
          { name: 'Unmerge Crash Group', value: 'crashUnmergeCrashGroupPost', action: 'Unmerges crash group', description: 'Unmerges a previously merged crash group' }
        ],
        default: 'crashAllCrashMessagesGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['customAlert'] } },
        options: [
          { name: 'Add Alert', value: 'customAlertAddPost', action: 'Adds alert', description: 'Adds a new alert with specified parameters (name, site, period, etc.)' },
          { name: 'Delete Alert', value: 'customAlertDelete', action: 'Deletes alert', description: 'Deletes a specific alert by its ID' },
          { name: 'Edit Alert', value: 'customAlertEditPost', action: 'Edits alert', description: 'Edits an existing alert with updated parameters' },
          { name: 'Get Alert', value: 'customAlertGet', action: 'Gets alert', description: 'Gets details for a specific alert by its ID' },
          { name: 'Get Alerts', value: 'customAlertListGet', action: 'Gets alerts', description: 'Gets list of all alerts for given sites (or all if superuser)' },
          { name: 'Get Triggered Alerts', value: 'customAlertTriggeredGet', action: 'Gets triggered alerts', description: 'Gets list of triggered alerts for a given site' },
          { name: 'Get Values For Alert In Past', value: 'customAlertValuesForPastGet', action: 'Gets values for alert in past', description: 'Gets values for an alert in the past for a given alert and sub-period' }
        ],
        default: 'customAlertAddPost',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['customDimension'] } },
        options: [
          { name: 'Configure Existing Custom Dimension', value: 'customDimensionConfigureExistingPost', action: 'Configures existing custom dimension', description: 'Configures an existing custom dimension with updated settings' },
          { name: 'Configure New Custom Dimension', value: 'customDimensionConfigureNewPost', action: 'Configures new custom dimension', description: 'Configures a new custom dimension with specified settings' },
          { name: 'Get Available Extraction Dimensions', value: 'customDimensionAvailableExtractionGet', action: 'Gets available extraction dimensions', description: 'Gets available extraction dimensions for custom dimensions' },
          { name: 'Get Available Scopes', value: 'customDimensionAvailableScopesGet', action: 'Gets available scopes', description: 'Gets all available scopes for custom dimensions in a site' },
          { name: 'Get Configured Custom Dimensions', value: 'customDimensionConfiguredGet', action: 'Gets configured custom dimensions', description: 'Gets all configured custom dimensions for a site' },
          { name: 'Get Configured Custom Dimensions Having Scope', value: 'customDimensionConfiguredScopeGet', action: 'Gets configured custom dimensions having scope', description: 'Gets configured custom dimensions by scope for a site' },
          { name: 'Get Custom Dimension', value: 'customDimensionGetGet', action: 'Gets custom dimension', description: 'Gets a custom dimension report for a site and period' }
        ],
        default: 'customDimensionConfigureExistingPost',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['customJsTracker'] } },
        options: [
          { name: 'Does Include Plugin Trackers Automatically', value: 'customJsTrackerPluginTrackersGet', action: 'Does include plugin trackers automatically', description: 'Checks if plugin trackers are automatically included in the custom tracker' }
        ],
        default: 'customJsTrackerPluginTrackersGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['customReport'] } },
        options: [
          { name: 'Add Custom Report', value: 'customReportAddPost', action: 'Adds custom report', description: 'Adds a new custom report with specified metrics and dimensions' },
          { name: 'Delete Custom Report', value: 'customReportDelete', action: 'Deletes custom report', description: 'Deletes a specific custom report by ID for a site' },
          { name: 'Duplicate Custom Report', value: 'customReportDuplicatePost', action: 'Duplicates custom report', description: 'Duplicates an existing custom report to specified sites' },
          { name: 'Get Available Categories', value: 'customReportAvailableCategoriesGet', action: 'Gets available categories', description: 'Gets all available categories for custom reports' },
          { name: 'Get Available Dimensions', value: 'customReportAvailableDimensionsGet', action: 'Gets available dimensions', description: 'Gets all available dimensions for custom reports' },
          { name: 'Get Available Metrics', value: 'customReportAvailableMetricsGet', action: 'Gets available metrics', description: 'Gets all available metrics for custom reports' },
          { name: 'Get Available Report Types', value: 'customReportAvailableReportTypesGet', action: 'Gets available report types', description: 'Gets all available report types for custom reports' },
          { name: 'Get Configured Report', value: 'customReportConfiguredReportGet', action: 'Gets configured report', description: 'Gets a specific custom report by ID for a site' },
          { name: 'Get Configured Reports', value: 'customReportConfiguredReportsGet', action: 'Gets configured reports', description: 'Gets all configured custom reports for a site' },
          { name: 'Get Custom Report', value: 'customReportGet', action: 'Gets custom report', description: 'Gets custom report data for a specific site, period and report ID' },
          { name: 'Pause Custom Report', value: 'customReportPausePost', action: 'Pauses custom report', description: 'Pauses an active custom report for a site' },
          { name: 'Resume Custom Report', value: 'customReportResumePost', action: 'Resumes custom report', description: 'Resumes a paused custom report for a site' },
          { name: 'Update Custom Report', value: 'customReportUpdatePost', action: 'Updates custom report', description: 'Updates an existing custom report with new parameters' }
        ],
        default: 'customReportAddPost',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['customVariable'] } },
        options: [
          { name: 'Get Custom Variables', value: 'customVariableGet', action: 'Gets custom variables', description: 'Gets custom variables for a site and period' },
          { name: 'Get Custom Variables Values From Name ID', value: 'customVariableValuesFromNameIdGet', action: 'Gets custom variables values from name ID', description: 'Gets values of custom variables for a site and period by name ID' },
          { name: 'Get Usages Of Slots', value: 'customVariableUsagesOfSlotsGet', action: 'Gets usages of slots', description: 'Gets usage statistics for custom variables slots in a site' }
        ],
        default: 'customVariableGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['dashboard'] } },
        options: [
          { name: 'Copy Dashboard To User', value: 'dashboardCopyToUserPost', action: 'Copies dashboard to user', description: 'Copies a dashboard to another user' },
          { name: 'Create New Dashboard For User', value: 'dashboardCreateForUserPost', action: 'Creates new dashboard for user', description: 'Creates a new dashboard for a specified user' },
          { name: 'Get Dashboards', value: 'dashboardGet', action: 'Gets dashboards', description: 'Gets list of all dashboards for a user' },
          { name: 'Remove Dashboard', value: 'dashboardRemovePost', action: 'Removes dashboard', description: 'Removes a specific dashboard for a user' },
          { name: 'Reset Dashboard Layout', value: 'dashboardResetLayoutPost', action: 'Resets dashboard layout', description: 'Resets the layout of a given dashboard for a user' }
        ],
        default: 'dashboardGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['devicePlugin'] } },
        options: [
          { name: 'Get Plugin', value: 'devicePluginGet', action: 'Gets plugin', description: 'Gets plugin usage data (e.g., browser plugins) for a site and period' }
        ],
        default: 'devicePluginGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['devicesDetection'] } },
        options: [
          { name: 'Get Brand', value: 'devicesDetectionBrandGet', action: 'Gets device brand', description: 'Gets device brand data for a site and period' },
          { name: 'Get Browser Engines', value: 'devicesDetectionBrowserEnginesGet', action: 'Gets browser engines', description: 'Gets browser engine data for a site and period' },
          { name: 'Get Browser Versions', value: 'devicesDetectionBrowserVersionsGet', action: 'Gets browser versions', description: 'Gets browser version data for a site and period' },
          { name: 'Get Browsers', value: 'devicesDetectionBrowsersGet', action: 'Gets browsers', description: 'Gets browser data for a site and period' },
          { name: 'Get Model', value: 'devicesDetectionModelGet', action: 'Gets device model', description: 'Gets device model data for a site and period' },
          { name: 'Get OS Families', value: 'devicesDetectionOsFamiliesGet', action: 'Gets operating system families', description: 'Gets operating system families data for a site and period' },
          { name: 'Get OS Versions', value: 'devicesDetectionOsVersionsGet', action: 'Gets operating system versions', description: 'Gets operating system versions data for a site and period' },
          { name: 'Get Type', value: 'devicesDetectionTypeGet', action: 'Gets device type', description: 'Gets device type data for a site and period' }
        ],
        default: 'devicesDetectionBrandGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['event'] } },
        options: [
          { name: 'Get Action', value: 'eventActionGet', action: 'Gets event action', description: 'Gets event action data for a given site and period' },
          { name: 'Get Action From Category ID', value: 'eventActionFromCategoryIdGet', action: 'Gets action from category ID', description: 'Gets event actions for a specific event category' },
          { name: 'Get Action From Name ID', value: 'eventActionFromNameIdGet', action: 'Gets action from name ID', description: 'Gets event actions for a specific event name' },
          { name: 'Get Category', value: 'eventCategoryGet', action: 'Gets event category', description: 'Gets event category data for a given site and period' },
          { name: 'Get Category From Action ID', value: 'eventCategoryFromActionIdGet', action: 'Gets category from action ID', description: 'Gets event categories for a specific event action' },
          { name: 'Get Category From Name ID', value: 'eventCategoryFromNameIdGet', action: 'Gets category from name ID', description: 'Gets event categories for a specific event name' },
          { name: 'Get Name', value: 'eventNameGet', action: 'Gets event name', description: 'Gets event name data for a given site and period' },
          { name: 'Get Name From Action ID', value: 'eventNameFromActionIdGet', action: 'Gets name from action ID', description: 'Gets event names for a specific event action' },
          { name: 'Get Name From Category ID', value: 'eventNameFromCategoryIdGet', action: 'Gets name from category ID', description: 'Gets event names for a specific event category' },
        ],
        default: 'eventActionGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['feedback'] } },
        options: [
          { name: 'Send Feedback For Feature', value: 'feedbackSendForFeaturePost', action: 'Sends feedback for feature', description: 'Sends user feedback for a specific feature' },
          { name: 'Send Feedback For Survey', value: 'feedbackSendForSurveyPost', action: 'Sends feedback for survey', description: 'Sends user feedback for a specific survey question' },
          { name: 'Update Feedback Reminder Date', value: 'feedbackUpdateReminderDatePost', action: 'Updates feedback reminder date', description: 'Updates the date for feedback reminders' },
        ],
        default: 'feedbackSendForFeaturePost',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['form'] } },
        options: [
          { name: 'Add Form', value: 'formAddPost', action: 'Adds form', description: 'Adds a new form for tracking with specified rules' },
          { name: 'Archive Form', value: 'formArchivePost', action: 'Archives form', description: 'Archives a form for future reference' },
          { name: 'Delete Form', value: 'formDelete', action: 'Deletes form', description: 'Deletes a form from tracking' },
          { name: 'Get All Goals', value: 'formAllGoalsGet', action: 'Gets all goals', description: 'Gets all goal data associated with forms for a site' },
          { name: 'Get Auto Creation Settings', value: 'formAutoCreationSettingsGet', action: 'Gets auto creation settings', description: 'Gets settings for auto-creating forms for a site' },
          { name: 'Get Available Conversion Rule Options', value: 'formAvailableConversionRuleOptionsGet', action: 'Gets available conversion rule options', description: 'Gets all available conversion rule options for forms' },
          { name: 'Get Available Form Rules', value: 'formAvailableFormRulesGet', action: 'Gets available form rules', description: 'Gets all available rules for form creation' },
          { name: 'Get Available Page Rules', value: 'formAvailablePageRulesGet', action: 'Gets available page rules', description: 'Gets all available page rules for forms' },
          { name: 'Get Available Statuses', value: 'formAvailableStatusesGet', action: 'Gets available statuses', description: 'Gets all available statuses for forms' },
          { name: 'Get Counters', value: 'formCountersGet', action: 'Gets counters', description: 'Gets form interaction counters for a given site and period' },
          { name: 'Get Current Most Popular Forms', value: 'formCurrentMostPopularFormsGet', action: 'Gets current most popular forms', description: 'Gets the most popular forms in the last minutes' },
          { name: 'Get Drop Off Fields', value: 'formDropOffFieldsGet', action: 'Gets drop off fields', description: 'Gets fields where users dropped off the form' },
          { name: 'Get Entry Fields', value: 'formEntryFieldsGet', action: 'Gets entry fields', description: 'Gets fields where users started filling out the form' },
          { name: 'Get Field Corrections', value: 'formFieldCorrectionsGet', action: 'Gets field corrections', description: 'Gets data on fields that were corrected by users' },
          { name: 'Get Field Size', value: 'formFieldSizeGet', action: 'Gets field size', description: 'Gets data on how much text users typed in each field' },
          { name: 'Get Field Timings', value: 'formFieldTimingsGet', action: 'Gets field timings', description: 'Gets data on how much time users spent on each field' },
          { name: 'Get Form', value: 'formFormGet', action: 'Gets form', description: 'Gets data for a specific form by ID' },
          { name: 'Get Form Analytics', value: 'formGet', action: 'Gets form analytics', description: 'Gets form analytics data for a specific site and period' },
          { name: 'Get Forms', value: 'formFormsGet', action: 'Gets forms', description: 'Gets list of all forms for a given site' },
          { name: 'Get Forms By Statuses', value: 'formFormsByStatusesGet', action: 'Gets forms by statuses', description: 'Gets forms filtered by their status' },
          { name: 'Get Most Used Fields', value: 'formMostUsedFieldsGet', action: 'Gets most used fields', description: 'Gets fields that were most interacted with by users' },
          { name: 'Get Page URLs', value: 'formPageUrlsGet', action: 'Gets page urls', description: 'Gets URLs where the form was used' },
          { name: 'Get Uneeded Fields', value: 'formUneededFieldsGet', action: 'Gets uneeded fields', description: 'Gets fields that are often left blank by users' },
          { name: 'Update Form', value: 'formUpdatePost', action: 'Updates form', description: 'Updates an existing form’s configuration and rules' },
          { name: 'Update Form Field Display Name', value: 'formUpdateFieldDisplayNamePost', action: 'Updates form field display name', description: 'Updates the display name of form fields' },
        ],
        default: 'formGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['funnel'] } },
        options: [
          { name: 'Delete Goal Funnel', value: 'funnelGoalFunnelDelete', action: 'Deletes goal funnel', description: 'Deletes a goal-specific funnel for a site' },
          { name: 'Delete Non Goal Funnel', value: 'funnelNonGoalFunnelDelete', action: 'Deletes non goal funnel', description: 'Deletes a non goal funnel for a site' },
          { name: 'Get All Activated Funnels For Site', value: 'funnelAllActivatedFunnelsForSiteGet', action: 'Gets all activated funnels for site', description: 'Gets all activated funnels for a site' },
          { name: 'Get Available Pattern Matches', value: 'funnelAvailablePatternMatchesGet', action: 'Gets available pattern matches', description: 'Gets available pattern matches for funnels' },
          { name: 'Get Funnel', value: 'funnelFunnelGet', action: 'Gets funnel', description: 'Gets detailed data for a specific funnel for a site' },
          { name: 'Get Funnel Entries', value: 'funnelFunnelEntriesGet', action: 'Gets funnel entries', description: 'Gets entries for a specific funnel step for a site and period' },
          { name: 'Get Funnel Exits', value: 'funnelFunnelExitsGet', action: 'Gets funnel exits', description: 'Gets exits for a specific funnel step for a site and period' },
          { name: 'Get Funnel Flow', value: 'funnelFunnelFlowGet', action: 'Gets funnel flow', description: 'Gets funnel flow data for a specific funnel and goal for a site and period' },
          { name: 'Get Funnel Flow Table', value: 'funnelFunnelFlowTableGet', action: 'Gets funnel flow table', description: 'Gets a detailed table view of the funnel flow for a site and period' },
          { name: 'Get Funnel Step Subtable', value: 'funnelFunnelStepSubtableGet', action: 'Gets funnel step subtable', description: 'Gets detailed data for a specific funnel step in a funnel for a site and period' },
          { name: 'Get Goal Funnel', value: 'funnelGoalFunnelGet', action: 'Gets goal funnel', description: 'Gets funnel data for a specific goal for a site' },
          { name: 'Get Metrics', value: 'funnelMetricsGet', action: 'Gets metrics', description: 'Gets metrics for a specific funnel and goal for a site and period' },
          { name: 'Get Sales Funnel For Site', value: 'funnelSalesFunnelForSiteGet', action: 'Gets sales funnel for site', description: 'Gets sales funnel data for a site' },
          { name: 'Has Any Activated Funnel For Site', value: 'funnelHasAnyActivatedFunnelForSiteGet', action: 'Checks activated funnels', description: 'Checks if there are any activated funnels for a site' },
          { name: 'Save Non Goal Funnel', value: 'funnelSaveNonGoalFunnelPost', action: 'Saves non goal funnel', description: 'Saves a new non goal funnel for a site' },
          { name: 'Set Goal Funnel', value: 'funnelSetGoalFunnelPost', action: 'Sets goal funnel', description: 'Sets up a new goal funnel with specified steps for a site' },
          { name: 'Test Url Matches Steps', value: 'funnelTestUrlMatchesStepsPost', action: 'Tests URL matches steps', description: 'Tests if a URL matches the defined funnel steps' },
        ],
        default: 'funnelFunnelGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['goal'] } },
        options: [
          { name: 'Add Goal', value: 'goalAddPost', action: 'Adds goal', description: 'Adds a new goal with specified settings for a site' },
          { name: 'Delete Goal', value: 'goalDelete', action: 'Deletes goal', description: 'Deletes a specific goal from a site' },
          { name: 'Get Days To Conversion', value: 'goalDaysToConversionGet', action: 'Gets days to conversion', description: 'Gets number of days to conversion for a goal' },
          { name: 'Get Goal', value: 'goalGoalGet', action: 'Gets goal', description: 'Gets details for a specific goal for a site' },
          { name: 'Get Goal Metrics', value: 'goelMetricsGet', action: 'Gets goal metrics', description: 'Gets goal-specific metrics for a site and period' },
          { name: 'Get Goals', value: 'goalGoalsGet', action: 'Gets goals', description: 'Gets list of all goals for a site' },
          { name: 'Get Items Category', value: 'goalItemsCategoryGet', action: 'Gets items category', description: 'Gets product data by category for a site and period' },
          { name: 'Get Items Name', value: 'goalItemsNameGet', action: 'Gets items name', description: 'Gets product data by name for a site and period' },
          { name: 'Get Items Sku', value: 'goalItemsSkuGet', action: 'Gets items SKU', description: 'Gets product data by SKU for a site and period' },
          { name: 'Get Visits Until Conversion', value: 'goalVisitsUntilConversionGet', action: 'Gets visits until conversion', description: 'Gets number of visits until conversion for a goal' },
          { name: 'Update Goal', value: 'goalUpdatePost', action: 'Updates goal', description: 'Updates an existing goal with new settings for a site' },
        ],
        default: 'goelMetricsGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['heatmapSessionRecording'] } },
        options: [
          { name: 'Add Heatmap', value: 'heatmapSessionRecordingAddHeatmaPost', action: 'Adds heatmap', description: 'Adds a new heatmap for tracking with specified rules' },
          { name: 'Add Session Recording', value: 'heatmapSessionRecordingAddSessionRecordingPost', action: 'Adds session recording', description: 'Adds a new session recording with specified rules' },
          { name: 'Delete Heatmap', value: 'heatmapSessionRecordingHeatmapDelete', action: 'Deletes heatmap', description: 'Deletes a heatmap for a site' },
          { name: 'Delete Heatmap Screenshot', value: 'heatmapSessionRecordingHeatmapScreenshotDelete', action: 'Deletes heatmap screenshot', description: 'Deletes a heatmap screenshot for a site' },
          { name: 'Delete Recorded Pageview', value: 'heatmapSessionRecordingRecordedPageviewDelete', action: 'Deletes recorded pageview', description: 'Deletes a recorded pageview for a site' },
          { name: 'Delete Recorded Session', value: 'heatmapSessionRecordingRecordedSessionDelete', action: 'Deletes recorded session', description: 'Deletes a recorded session for a site' },
          { name: 'Delete Session Recording', value: 'heatmapSessionRecordingSessionRecordingDelete', action: 'Deletes session recording', description: 'Deletes a session recording for a site' },
          { name: 'Duplicate Heatmap', value: 'heatmapSessionRecordingDuplicateHeatmapPost', action: 'Duplicates heatmap', description: 'Duplicates an existing heatmap for other sites' },
          { name: 'End Heatmap', value: 'heatmapSessionRecordingEndHeatmapPost', action: 'Ends heatmap', description: 'Ends and finalizes a heatmap for a site' },
          { name: 'End Session Recording', value: 'heatmapSessionRecordingEndSessionRecordingPost', action: 'Ends session recording', description: 'Ends and finalizes a session recording for a site' },
          { name: 'Get Available Device Types', value: 'heatmapSessionRecordingAvailableDeviceTypesGet', action: 'Gets available device types', description: 'Gets available device types for heatmap and session recordings' },
          { name: 'Get Available Heatmap Types', value: 'heatmapSessionRecordingAvailableHeatmapTypesGet', action: 'Gets available heatmap types', description: 'Gets available heatmap types for session recordings' },
          { name: 'Get Available Session Recording Sample Limits', value: 'heatmapSessionRecordingAvailableSessionRecordingSampleLimitsGet', action: 'Gets available sample limits', description: 'Gets available sample limits for session recordings' },
          { name: 'Get Available Statuses', value: 'heatmapSessionRecordingAvailableStatusesGet', action: 'Gets available statuses', description: 'Gets available statuses for heatmap and session recordings' },
          { name: 'Get Available Target Page Rules', value: 'heatmapSessionRecordingAvailableTargetPageRulesGet', action: 'Gets available target page rules', description: 'Gets available target page rules for heatmap and session recordings' },
          { name: 'Get Embed Session Info', value: 'heatmapSessionRecordingEmbedSessionInfoGet', action: 'Gets embed info', description: 'Gets embed information for a session recording' },
          { name: 'Get Event Types', value: 'heatmapSessionRecordingEventTypesGet', action: 'Gets event types', description: 'Gets available event types for heatmap and session recordings' },
          { name: 'Get Heatmap', value: 'heatmapSessionRecordingHeatmapGet', action: 'Gets heatmap', description: 'Gets a heatmap by ID for a site' },
          { name: 'Get Heatmaps', value: 'heatmapSessionRecordingHeatmapsGet', action: 'Gets heatmaps', description: 'Gets all available heatmaps for a site' },
          { name: 'Get Recorded Heatmap', value: 'heatmapSessionRecordingRecordedHeatmapGet', action: 'Gets recorded heatmap', description: 'Gets data for a specific recorded heatmap for a site' },
          { name: 'Get Recorded Heatmap Metadata', value: 'heatmapSessionRecordingRecordedHeatmapMetadataGet', action: 'Gets recorded heatmap metadata', description: 'Gets metadata for recorded heatmaps' },
          { name: 'Get Recorded Session', value: 'heatmapSessionRecordingRecordedSessionGet', action: 'Gets recorded session', description: 'Gets details for a specific recorded session' },
          { name: 'Get Recorded Sessions', value: 'heatmapSessionRecordingRecordedSessionsGet', action: 'Gets recorded sessions', description: 'Gets detailed data for recorded sessions for a site' },
          { name: 'Get Session Recording', value: 'heatmapSessionRecordingSessionRecordingGet', action: 'Gets session recording', description: 'Gets a session recording by ID for a site' },
          { name: 'Get Session Recordings', value: 'heatmapSessionRecordingSessionRecordingsGet', action: 'Gets session recordings', description: 'Gets all available session recordings for a site' },
          { name: 'Pause Heatmap', value: 'heatmapSessionRecordingPauseHeatmapPost', action: 'Pauses heatmap', description: 'Pauses a heatmap for a site' },
          { name: 'Pause Session Recording', value: 'heatmapSessionRecordingPauseSessionRecordingPost', action: 'Pauses session recording', description: 'Pauses a session recording for a site' },
          { name: 'Resume Heatmap', value: 'heatmapSessionRecordingResumeHeatmapPost', action: 'Resumes heatmap', description: 'Resumes a paused heatmap for a site' },
          { name: 'Resume Session Recording', value: 'heatmapSessionRecordingResumeSessionRecordingPost', action: 'Resumes session recording', description: 'Resumes a paused session recording for a site' },
          { name: 'Test Url Match Pages', value: 'heatmapSessionRecordingTestUrlMatchPagesPost', action: 'Tests URL match pages', description: 'Tests if a URL matches the defined rules for a heatmap' },
          { name: 'Update Heatmap', value: 'heatmapSessionRecordingUpdateHeatmapPost', action: 'Updates heatmap', description: 'Updates settings for an existing heatmap' },
          { name: 'Update Session Recording', value: 'heatmapSessionRecordingUpdateSessionRecordingPost', action: 'Updates session recording', description: 'Updates settings for an existing session recording' },
        ],
        default: 'heatmapSessionRecordingAddHeatmaPost',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['imageGraph'] } },
        options: [
          { name: 'Get Static Image Graph', value: 'imageGraphStaticImageGraphGet', action: 'Generates static image graph', description: 'Generates a static PNG graph for any Matomo report with specified settings' }
        ],
        default: 'imageGraphStaticImageGraphGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['insight'] } },
        options: [
          { name: 'Can Generate Insights', value: 'insightCanGenerateInsightsGet', action: 'Can generate insights', description: 'Checks if insights can be generated for a specific period and date' },
          { name: 'Get Insights', value: 'insightInsightsGet', action: 'Gets insights', description: 'Gets detailed insights data for a site and period based on specific criteria' },
          { name: 'Get Insights Overview', value: 'insightInsightsOverviewGet', action: 'Gets insights overview', description: 'Gets an overview of insights for a site and period' },
          { name: 'Get Movers And Shakers', value: 'insightMoversAndShakersGet', action: 'Gets movers and shakers', description: 'Gets detailed movers and shakers data for a site and period' },
          { name: 'Get Movers And Shakers Overview', value: 'insightMoversAndShakersOverviewGet', action: 'Gets movers and shakers overview', description: 'Gets an overview of movers and shakers for a site and period' }
        ],
        default: 'insightCanGenerateInsightsGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['languagesManager'] } },
        options: [
          { name: 'Get Available Language Names', value: 'languagesManagerAvailableLanguageNamesGet', action: 'Gets available language names', description: 'Gets the names of all available languages in Matomo' },
          { name: 'Get Available Languages', value: 'languagesManagerAvailableLanguagesGet', action: 'Gets available languages', description: 'Gets the list of all available languages in Matomo' },
          { name: 'Get Available Languages Info', value: 'languagesManagerAvailableLanguagesInfoGet', action: 'Gets available languages info', description: 'Gets additional information about available languages in Matomo' },
          { name: 'Get Language For User', value: 'languagesManagerLanguageForUserGet', action: 'Gets language for user', description: 'Gets the language preference for a specific user' },
          { name: 'Get Translations For Language', value: 'languagesManagerTranslationsForLanguageGet', action: 'Gets translations for language', description: 'Gets all translation strings for a given language' },
          { name: 'Is Language Available', value: 'languagesManagerIsLanguageAvailableGet', action: 'Checks language availability', description: 'Checks if a specified language is available in Matomo' },
          { name: 'Set 12 Hour Clock For User', value: 'languagesManagerSet12HourClockForUserPost', action: 'Sets 12 hour clock for user', description: 'Sets the 12 hour clock format for a user' },
          { name: 'Set Language For User', value: 'languagesManagerSetLanguageForUserPost', action: 'Sets language for user', description: 'Sets the language preference for a specific user' },
          { name: 'Uses 12 Hour Clock For User', value: 'languagesManagerUses12HourClockForUserPost', action: 'Checks if 12 hour clock is used', description: 'Checks if a user is using the 12 hour clock format' }
        ],
        default: 'languagesManagerAvailableLanguageNamesGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['live'] } },
        options: [
          { name: 'Get Counters', value: 'liveCountersGet', action: 'Gets visit counters', description: 'Gets visit counters for the last N minutes for a site' },
          { name: 'Get Last Visits Details', value: 'liveLastVisitsDetailsGet', action: 'Gets last visit details', description: 'Gets detailed information about the last visits for a site' },
          { name: 'Get Most Recent Visitor ID', value: 'liveMostRecentVisitorIdGet', action: 'Gets most recent visitor ID', description: 'Gets the most recent visitor ID for a site' },
          { name: 'Get Most Recent Visits DateTime', value: 'liveMostRecentVisitsDateTimeGet', action: 'Gets most recent visits date and time', description: 'Gets the most recent visit timestamp for a site' },
          { name: 'Get Visitor Profile', value: 'liveVisitorProfileGet', action: 'Gets visitor profile', description: 'Gets profile data for a specific visitor' },
          { name: 'Is Visitor Profile Enabled', value: 'liveIsVisitorProfileEnabledGet', action: 'Checks visitor profile', description: 'Checks if the visitor profile feature is enabled for a site' }
        ],
        default: 'liveCountersGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['login'] } },
        options: [
          { name: 'Unblock Brute Force IPs', value: 'loginUnblockBruteForceIPsPost', action: 'Unblocks brute force ips', description: 'Unblocks ips that were blocked due to brute force attempts' }
        ],
        default: 'loginUnblockBruteForceIPsPost',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['marketingCampaignsReporting'] } },
        options: [
          { name: 'Get Campaign ID', value: 'marketingCampaignsReportingIdGet', action: 'Gets campaign ID', description: 'Gets campaign ID for a specific site and period' },
          { name: 'Get Content', value: 'marketingCampaignsReportingContentGet', action: 'Gets campaign content', description: 'Gets the content for a specific campaign on a site' },
          { name: 'Get Group', value: 'marketingCampaignsReportingGroupGet', action: 'Gets campaign group', description: 'Gets the group associated with a specific campaign on a site' },
          { name: 'Get Keyword', value: 'marketingCampaignsReportingKeywordGet', action: 'Gets campaign keyword', description: 'Gets keyword data for a campaign on a site' },
          { name: 'Get Keyword Content From Name ID', value: 'marketingCampaignsReportingKeywordContentFromNameIdGet', action: 'Gets keyword content', description: 'Gets keyword content for a given campaign name ID' },
          { name: 'Get Medium', value: 'marketingCampaignsReportingMediumGet', action: 'Gets campaign medium', description: 'Gets the medium of traffic for a specific campaign on a site' },
          { name: 'Get Name', value: 'marketingCampaignsReportingNameGet', action: 'Gets campaign name', description: 'Gets campaign name for a specific site and period' },
          { name: 'Get Name From Source Medium ID', value: 'marketingCampaignsReportingNameFromSourceMediumIdGet', action: 'Gets campaign name from source medium ID', description: 'Gets the name of a campaign from a source-medium ID' },
          { name: 'Get Placement', value: 'marketingCampaignsReportingPlacementGet', action: 'Gets campaign placement', description: 'Gets the placement of a campaign for a site' },
          { name: 'Get Source', value: 'marketingCampaignsReportingSourceGet', action: 'Gets campaign source', description: 'Gets the source of traffic for a specific campaign on a site' },
          { name: 'Get Source And Medium', value: 'marketingCampaignsReportingSourceAndMediumGet', action: 'Gets campaign source and medium', description: 'Gets data on both source and medium for a campaign' }
        ],
        default: 'marketingCampaignsReportingIdGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['media'] } },
        options: [
          { name: 'Get Audio Hours', value: 'mediaAudioHoursGet', action: 'Gets audio hours', description: 'Gets data on audio consumption by hour for a site and period' },
          { name: 'Get Audio Resources', value: 'mediaAudioResourcesGet', action: 'Gets audio resources', description: 'Gets audio resource data for a site and period' },
          { name: 'Get Audio Titles', value: 'mediaAudioTitlesGet', action: 'Gets audio titles', description: 'Gets the list of audio titles for a site and period' },
          { name: 'Get Current Most Plays', value: 'mediaCurrentMostPlaysGet', action: 'Gets current most plays', description: 'Gets the most played media items in the last N minutes' },
          { name: 'Get Current Num Plays', value: 'mediaCurrentNumPlaysGet', action: 'Gets current number of plays', description: 'Gets the number of video/audio plays in the last N minutes' },
          { name: 'Get Current Sum Time Spent', value: 'mediaCurrentSumTimeSpentGet', action: 'Gets current sum time spent', description: 'Gets the total time spent on videos/audio in the last N minutes' },
          { name: 'Get Grouped Audio Resources', value: 'mediaGroupedAudioResourcesGet', action: 'Gets grouped audio resources', description: 'Gets audio resources grouped by URL for a site and period' },
          { name: 'Get Grouped Video Resources', value: 'mediaGroupedVideoResourcesGet', action: 'Gets grouped video resources', description: 'Gets video resources grouped by URL for a site and period' },
          { name: 'Get Media Analytics', value: 'mediaAnalyticsGet', action: 'Gets media analytics', description: 'Gets overall media analytics for a site, including plays, impressions, and finishes' },
          { name: 'Get Players', value: 'mediaPlayersGet', action: 'Gets players', description: 'Gets data on the media players used for videos and audios on a site' },
          { name: 'Get Video Hours', value: 'mediaVideoHoursGet', action: 'Gets video hours', description: 'Gets data on video consumption by hour for a site and period' },
          { name: 'Get Video Resolutions', value: 'mediaVideoResolutionsGet', action: 'Gets video resolutions', description: 'Gets data on video resolution for a site and period' },
          { name: 'Get Video Resources', value: 'mediaVideoResourcesGet', action: 'Gets video resources', description: 'Gets video resource data for a site and period' },
          { name: 'Get Video Titles', value: 'mediaVideoTitlesGet', action: 'Gets video titles', description: 'Gets the list of video titles for a site and period' },
          { name: 'Has Records', value: 'mediaHasRecordsGet', action: 'Checks records', description: 'Checks if media analytics records exist for a site' },
        ],
        default: 'mediaAudioHoursGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['mobileMessaging'] } },
        options: [
          { name: 'Add Phone Number', value: 'mobileMessagingAddPhoneNumberPost', action: 'Adds phone number', description: 'Adds a phone number for SMS sending' },
          { name: 'Are SMS API Credentials Provided', value: 'mobileMessagingAreSmsApiCredentialsProvidedPost', action: 'Checks SMS API credentials', description: 'Checks if the SMS API credentials are available for a site' },
          { name: 'Delete SMS API Credential', value: 'mobileMessagingSmsApiCredentialDelete', action: 'Deletes SMS API credential', description: 'Deletes the SMS API credential for the provider' },
          { name: 'Get Credit Left', value: 'mobileMessagingCreditLeftGet', action: 'Gets SMS credit left', description: 'Gets the remaining credit for SMS usage' },
          { name: 'Get Delegated Management', value: 'mobileMessagingDelegatedManagementGet', action: 'Gets delegated management', description: 'Gets the current delegated management status for SMS service' },
          { name: 'Get Phone Numbers', value: 'mobileMessagingPhoneNumbersGet', action: 'Gets phone numbers', description: 'Gets all phone numbers registered for SMS sending' },
          { name: 'Get SMS Provider', value: 'mobileMessagingSmsProviderGet', action: 'Gets SMS provider', description: 'Gets the SMS provider for the current site' },
          { name: 'Remove Phone Number', value: 'mobileMessagingRemovePhoneNumberPost', action: 'Removes phone number', description: 'Removes a phone number from the system' },
          { name: 'Resend Verification Code', value: 'mobileMessagingResendVerificationCodePost', action: 'Resends verification code', description: 'Resends the verification code for a phone number' },
          { name: 'Set Delegated Management', value: 'mobileMessagingSetDelegatedManagementPost', action: 'Sets delegated management', description: 'Sets the delegated management option for SMS service' },
          { name: 'Set SMS API Credential', value: 'mobileMessagingSetSmsApiCredentialPost', action: 'Sets SMS API credentials', description: 'Sets SMS API credentials for a specified provider' },
          { name: 'Validate Phone Number', value: 'mobileMessagingValidatePhoneNumberPost', action: 'Validates phone number', description: 'Validates a phone number using a verification code' },
        ],
        default: 'mobileMessagingAddPhoneNumberPost',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['multiChannelConversionAttribution'] } },
        options: [
          { name: 'Get Available Campaign Dimension Combinations', value: 'multiChannelConversionAttributionAvailableCampaignDimensionCombinationsGet', action: 'Gets campaign dimension combinations', description: 'Gets available campaign dimension combinations for a site' },
          { name: 'Get Channel Attribution', value: 'multiChannelConversionAttributionChannelAttributionGet', action: 'Gets channel attribution', description: 'Gets channel attribution data for a site and period' },
          { name: 'Get Goal Attribution', value: 'multiChannelConversionAttributionGoalAttributionGet', action: 'Gets goal attribution', description: 'Gets the attribution model for a specific goal' },
          { name: 'Get Site Attribution Goals', value: 'multiChannelConversionAttributionSiteAttributionGoalsGet', action: 'Gets site attribution goals', description: 'Gets the attribution goals for a site' },
          { name: 'Set Goal Attribution', value: 'multiChannelConversionAttributionSetGoalAttributionPost', action: 'Sets goal attribution', description: 'Sets the attribution model for a specific goal' },
        ],
        default: 'multiChannelConversionAttributionAvailableCampaignDimensionCombinationsGet',
      },     
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['multiSite'] } },
        options: [
          { name: 'Get All', value: 'multiSiteAllGet', action: 'Gets all sites', description: 'Gets key metrics for all websites in Matomo' },
          { name: 'Get All With Groups', value: 'multiSiteAllWithGroupsGet', action: 'Gets all sites with groups', description: 'Gets key metrics for all sites with group data' },
          { name: 'Get One', value: 'multiSiteOneGet', action: 'Gets one site', description: 'Gets key metrics for a specific site in Matomo' },
        ],
        default: 'multiSiteAllGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['overlay'] } },
        options: [
          { name: 'Get Following Pages', value: 'overlayFollowingPagesGet', action: 'Gets following pages', description: 'Gets list of pages following a specific URL for a site' },
          { name: 'Get Translations', value: 'overlayTranslationsGet', action: 'Gets translations', description: 'Gets translation strings for a specific site' },
        ],
        default: 'overlayFollowingPagesGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['pagePerformance'] } },
        options: [
          { name: 'Get Page Performance', value: 'pagePerformanceGet', action: 'Gets page performance', description: 'Gets performance metrics for a page for a site and period' },
        ],
        default: 'pagePerformanceGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['privacyManager'] } },
        options: [
          { name: 'Anonymize Some Raw Data', value: 'privacyManagerAnonymizeSomeRawDataPost', action: 'Anonymizes raw data', description: 'Anonymizes specific raw data for a site' },
          { name: 'Delete Data Subjects', value: 'privacyManagerDataSubjectsDelete', action: 'Deletes data subjects', description: 'Deletes user data for specified visits' },
          { name: 'Export Data Subjects', value: 'privacyManagerExportDataSubjectsPost', action: 'Exports data subjects', description: 'Exports user data for specified visits' },
          { name: 'Find Data Subjects', value: 'privacyManagerFindDataSubjectsPost', action: 'Finds data subjects', description: 'Finds specific user data subjects for a site' },
          { name: 'Get Available Link Visit Action Columns To Anonymize', value: 'privacyManagerAvailableLinkVisitActionColumnsToAnonymizeGet', action: 'Gets available link visit action columns', description: 'Gets columns related to visit actions available for anonymization' },
          { name: 'Get Available Visit Columns To Anonymize', value: 'privacyManagerAvailableVisitColumnsToAnonymizeGet', action: 'Gets available visit columns', description: 'Gets columns available for anonymization' },
        ],
        default: 'privacyManagerAnonymizeSomeRawDataPost',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['referrer'] } },
        options: [
          { name: 'Get AI Assistants', value: 'referrerAiAssistantsGet', action: 'Gets AI assistants', description: 'Gets list of AI assistants referring traffic for a site' },
          { name: 'Get All', value: 'referrerAllGet', action: 'Gets all referrers', description: 'Gets list of all referrers for a site' },
          { name: 'Get Campaigns', value: 'referrerCampaignsGet', action: 'Gets campaigns', description: 'Gets list of campaigns referring traffic for a site' },
          { name: 'Get Keywords', value: 'referrerKeywordsGet', action: 'Gets keywords', description: 'Gets list of search engine keywords for a site' },
          { name: 'Get Keywords From Campaign ID', value: 'referrerKeywordsFromCampaignIdGet', action: 'Gets keywords from campaign ID', description: 'Gets keywords based on a specific campaign ID' },
          { name: 'Get Keywords From Search Engine ID', value: 'referrerKeywordsFromSearchEngineIdGet', action: 'Gets keywords from search engine ID', description: 'Gets keywords based on a specific search engine ID' },
          { name: 'Get Number Of Distinct AI Assistants', value: 'referrerNumberOfDistinctAiAssistantsGet', action: 'Gets number of distinct AI assistants', description: 'Gets the count of distinct AI assistants referring traffic for a site' },
          { name: 'Get Number Of Distinct Campaigns', value: 'referrerNumberOfDistinctCampaignsGet', action: 'Gets number of distinct campaigns', description: 'Gets the count of distinct campaigns referring traffic for a site' },
          { name: 'Get Number Of Distinct Keywords', value: 'referrerNumberOfDistinctKeywordsGet', action: 'Gets number of distinct keywords', description: 'Gets the count of distinct search keywords referring traffic for a site' },
          { name: 'Get Number Of Distinct Search Engines', value: 'referrerNumberOfDistinctSearchEnginesGet', action: 'Gets number of distinct search engines', description: 'Gets the count of distinct search engines referring traffic for a site' },
          { name: 'Get Number Of Distinct Social Networks', value: 'referrerNumberOfDistinctSocialNetworksGet', action: 'Gets number of distinct social networks', description: 'Gets the count of distinct social networks referring traffic for a site' },
          { name: 'Get Number Of Distinct Websites', value: 'referrerNumberOfDistinctWebsitesGet', action: 'Gets number of distinct websites', description: 'Gets the count of distinct referrer websites for a site' },
          { name: 'Get Number Of Distinct Websites URLs', value: 'referrerNumberOfDistinctWebsitesUrlsGet', action: 'Gets number of distinct website urls', description: 'Gets the count of distinct URLs from referrer websites for a site' },
          { name: 'Get Referrer', value: 'referrerGet', action: 'Gets referrers', description: 'Gets referrer data (websites, search engines, campaigns) for a site and period' },
          { name: 'Get Referrer Type', value: 'referrerTypeGet', action: 'Gets referrer type', description: 'Gets referrer overview report data for a site' },
          { name: 'Get Search Engines', value: 'referrerSearchEnginesGet', action: 'Gets search engines', description: 'Gets list of search engines referring traffic for a site' },
          { name: 'Get Search Engines From Keyword ID', value: 'referrerSearchEnginesFromKeywordIdGet', action: 'Gets search engines from keyword ID', description: 'Gets search engine data based on keyword ID' },
          { name: 'Get Socials', value: 'referrerSocialsGet', action: 'Gets socials', description: 'Gets list of social networks referring traffic for a site' },
          { name: 'Get URLs For AI Assistant', value: 'referrerUrlsForAiAssistantGet', action: 'Gets ur ls for ai assistant', description: 'Gets URLs from a specific AI assistant for a site' },
          { name: 'Get URLs For Social', value: 'referrerUrlsForSocialGet', action: 'Gets urls for social', description: 'Gets URLs from a specific social network for a site' },
          { name: 'Get URLs From Website ID', value: 'referrerUrlsFromWebsiteIdGet', action: 'Gets ur ls from website id', description: 'Gets URLs from a specific referrer website for a site' },
          { name: 'Get Websites', value: 'referrerWebsitesGet', action: 'Gets websites', description: 'Gets list of referrer websites for a site' },
        ],
        default: 'referrerAiAssistantsGet',
      }, 
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['resolution'] } },
        options: [
          { name: 'Get Configuration', value: 'resolutionConfigurationGet', action: 'Gets configuration', description: 'Gets configuration settings for screen resolutions for a site and period' },
          { name: 'Get Resolution', value: 'resolutionResolutionGet', action: 'Gets resolution', description: 'Gets screen resolution data for a site and period' },
        ],
        default: 'resolutionConfigurationGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['rollUpReporting'] } },
        options: [
          { name: 'Add Roll Up', value: 'rollUpReportingAddRollUpPost', action: 'Adds roll up', description: 'Adds a new roll up configuration for a site' },
          { name: 'Get Roll Ups', value: 'rollUpReportingRollUpsPost', action: 'Gets roll ups', description: 'Gets list of all roll up configurations for a site' },
          { name: 'Update Roll Up', value: 'rollUpReportingUpdateRollUpPost', action: 'Updates roll up', description: 'Updates an existing roll up configuration for a site' },
        ],
        default: 'rollUpReportingAddRollUpPost',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['scheduledReport'] } },
        options: [
          { name: 'Add Report', value: 'scheduledReportAddReportPost', action: 'Adds scheduled report', description: 'Adds a new scheduled email report for a site' },
          { name: 'Delete Report', value: 'scheduledReportReportDelete', action: 'Deletes scheduled report', description: 'Deletes a specific scheduled email report' },
          { name: 'Generate Report', value: 'scheduledReportGenerateReportPost', action: 'Generates scheduled report', description: 'Generates a report for a specific date range' },
          { name: 'Get Reports', value: 'scheduledReportReportsGet', action: 'Gets scheduled reports', description: 'Gets list of all scheduled reports for a site' },
          { name: 'Send Report', value: 'scheduledReportSendReportPost', action: 'Sends scheduled report', description: 'Sends a report via email to specified recipients' },
          { name: 'Update Report', value: 'scheduledReportUpdateReportPost', action: 'Updates scheduled report', description: 'Updates an existing scheduled email report' },
        ],
        default: 'scheduledReportAddReportPost',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['searchEngineKeywordsPerformance'] } },
        options: [
          { name: 'Get Crawling Error Examples Bing', value: 'searchEngineKeywordsPerformanceCrawlingErrorExamplesBingGet', action: 'Gets bing crawling error examples', description: 'Gets crawling error examples for Bing' },
          { name: 'Get Crawling Overview Bing', value: 'searchEngineKeywordsPerformanceCrawlingOverviewBingGet', action: 'Gets bingcrawling overview', description: 'Gets crawling overview for Bing search engine' },
          { name: 'Get Crawling Overview Yandex', value: 'searchEngineKeywordsPerformanceCrawlingOverviewYandexGet', action: 'Gets yandex crawling overview', description: 'Gets crawling overview for Yandex search engine' },
          { name: 'Get Keywords', value: 'searchEngineKeywordsPerformanceKeywordsGet', action: 'Gets search engine keywords', description: 'Gets search engine keyword data for a site' },
          { name: 'Get Keywords Bing', value: 'searchEngineKeywordsPerformanceKeywordsBingGet', action: 'Gets bing keywords', description: 'Gets Bing search keywords for a site' },
          { name: 'Get Keywords Google', value: 'searchEngineKeywordsPerformanceKeywordsGoogleGet', action: 'Gets google keywords', description: 'Gets Google search keywords for a site' },
          { name: 'Get Keywords Google Image', value: 'searchEngineKeywordsPerformanceKeywordsGoogleImageGet', action: 'Gets google image keywords', description: 'Gets Google image search keywords for a site' },
          { name: 'Get Keywords Google News', value: 'searchEngineKeywordsPerformanceKeywordsGoogleNewsGet', action: 'Gets google news keywords', description: 'Gets Google news search keywords for a site' },
          { name: 'Get Keywords Google Video', value: 'searchEngineKeywordsPerformanceKeywordsGoogleVideoGet', action: 'Gets google video keywords', description: 'Gets Google video search keywords for a site' },
          { name: 'Get Keywords Google Web', value: 'searchEngineKeywordsPerformanceKeywordsGoogleWebGet', action: 'Gets google web keywords', description: 'Gets Google web search keywords for a site' },
          { name: 'Get Keywords Imported', value: 'searchEngineKeywordsPerformanceKeywordsImportedGet', action: 'Gets imported keywords', description: 'Gets imported search keywords for a site' },
          { name: 'Get Keywords Yandex', value: 'searchEngineKeywordsPerformanceKeywordsYandexGet', action: 'Gets yandex keywords', description: 'Gets Yandex search keywords for a site' },
        ],
        default: 'searchEngineKeywordsPerformanceCrawlingErrorExamplesBingGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['segmentEditor'] } },
        options: [
          { name: 'Add Segment', value: 'segmentEditorAddSegmentPost', action: 'Adds segment', description: 'Adds a new segment with specified definition' },
          { name: 'Delete Segment', value: 'segmentEditorSegmentDelete', action: 'Deletes segment', description: 'Deletes a specific segment by ID' },
          { name: 'Get All Segments', value: 'segmentEditorAllSegmentsGet', action: 'Gets all segments', description: 'Gets list of all saved segments for a site' },
          { name: 'Get Segment', value: 'segmentEditorSegmentGet', action: 'Gets segment', description: 'Gets details for a specific segment by ID' },
          { name: 'Is User Can Add New Segment', value: 'segmentEditorUserCanAddNewSegmentGet', action: 'Checks if user can add segment', description: 'Checks if the user has permission to add new segments' },
          { name: 'Update Segment', value: 'segmentEditorUpdateSegmentPost', action: 'Updates segment', description: 'Updates an existing segment with new data' },
        ],
        default: 'segmentEditorAddSegmentPost',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['seo'] } },
        options: [
          { name: 'Get Rank', value: 'seoRankGet', action: 'Gets rank', description: 'Gets the SEO rank for a given URL' },
        ],
        default: 'seoRankGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['sitesManager'] } },
        options: [
          { name: 'Add Site', value: 'sitesManagerAddSitePost', action: 'Adds site', description: 'Adds a new site to Matomo' },
          { name: 'Add Site Alias Urls', value: 'sitesManagerAddSiteAliasUrlsPost', action: 'Adds site alias urls', description: 'Adds alias URLs for a specific site' },
          { name: 'Delete Site', value: 'sitesManagerSiteDelete', action: 'Deletes site', description: 'Deletes a specific site from Matomo' },
          { name: 'Get All Sites', value: 'sitesManagerGetAllSitesGet', action: 'Gets all sites', description: 'Gets all sites in Matomo' },
          { name: 'Get All Sites ID', value: 'sitesManagerGetAllSitesIdGet', action: 'Gets all sites ids', description: 'Gets the list of all site IDs in Matomo' },
          { name: 'Get Currency List', value: 'sitesManagerGetCurrencyListGet', action: 'Gets currency list', description: 'Gets the list of currencies available in Matomo' },
          { name: 'Get Currency Symbols', value: 'sitesManagerGetCurrencySymbolsGet', action: 'Gets currency symbols', description: 'Gets the symbols for currencies in Matomo' },
          { name: 'Get Default Currency', value: 'sitesManagerGetDefaultCurrencyGet', action: 'Gets default currency', description: 'Gets the default currency for the sites' },
          { name: 'Get Default Timezone', value: 'sitesManagerGetDefaultTimezoneGet', action: 'Gets default timezone', description: 'Gets the default timezone for all sites' },
          { name: 'Get Excluded IPs Global', value: 'sitesManagerGetExcludedIpsGlobalGet', action: 'Gets global excluded ips', description: 'Gets the global excluded IPs for all sites' },
          { name: 'Get Excluded Query Parameters', value: 'sitesManagerGetExcludedQueryParametersGet', action: 'Gets excluded query parameters', description: 'Gets the excluded query parameters for a site' },
          { name: 'Get Excluded Query Parameters Global', value: 'sitesManagerGetExcludedQueryParametersGlobalGet', action: 'Gets global excluded query parameters', description: 'Gets the global excluded query parameters' },
          { name: 'Get Excluded Referrers', value: 'sitesManagerGetExcludedReferrersGet', action: 'Gets excluded referrers', description: 'Gets excluded referrers for a specific site' },
          { name: 'Get Excluded Referrers Global', value: 'sitesManagerGetExcludedReferrersGlobalGet', action: 'Gets global excluded referrers', description: 'Gets the global excluded referrers for all sites' },
          { name: 'Get Excluded User Agents Global', value: 'sitesManagerGetExcludedUserAgentsGlobalGet', action: 'Gets global excluded user agents', description: 'Gets the global excluded user agents' },
          { name: 'Get Exclusion Type For Query Params', value: 'sitesManagerGetExclusionTypeForQueryParamsGet', action: 'Gets exclusion type for query parameters', description: 'Gets the exclusion type for query parameters' },
          { name: 'Get Image Tracking Code', value: 'sitesManagerGetImageTrackingCodeGet', action: 'Gets image tracking code', description: 'Gets the image tracking code for a site' },
          { name: 'Get IPs For Range', value: 'sitesManagerGetIpsForRangeGet', action: 'Gets ips for range', description: 'Gets the IPs for a given IP range' },
          { name: 'Get Javascript Tag', value: 'sitesManagerGetJavascriptTagGet', action: 'Gets javascript tag', description: 'Gets the JavaScript tracking tag for a specific site' },
          { name: 'Get Keep URL Fragments Global', value: 'sitesManagerGetKeepUrlFragmentsGlobalGet', action: 'Gets global URL fragments setting', description: 'Gets the global URL fragment setting' },
          { name: 'Get Num Websites To Display Per Page', value: 'sitesManagerGetNumWebsitesToDisplayPerPageGet', action: 'Gets number of websites per page', description: 'Gets the number of websites to display per page' },
          { name: 'Get Pattern Match Sites', value: 'sitesManagerGetPatternMatchSitesGet', action: 'Gets pattern match sites', description: 'Gets sites based on a pattern match' },
          { name: 'Get Search Category Parameters Global', value: 'sitesManagerGetSearchCategoryParametersGlobalGet', action: 'Gets global search category parameters', description: 'Gets the global search category parameters' },
          { name: 'Get Search Keyword Parameters Global', value: 'sitesManagerGetSearchKeywordParametersGlobalGet', action: 'Gets global search keyword parameters', description: 'Gets the global search keyword parameters' },
          { name: 'Get Site From ID', value: 'sitesManagerGetSiteFromIdGet', action: 'Gets site from ID', description: 'Gets details of a specific site by its ID' },
          { name: 'Get Site Settings', value: 'sitesManagerGetSiteSettingsGet', action: 'Gets site settings', description: 'Gets settings for a specific site' },
          { name: 'Get Site Urls From ID', value: 'sitesManagerGetSiteUrlsFromIdGet', action: 'Gets site urls from ID', description: 'Gets the URLs for a specific site by ID' },
          { name: 'Get Sites From Group', value: 'sitesManagerGetSitesFromGroupGet', action: 'Gets sites from group', description: 'Gets all sites in a specific group' },
          { name: 'Get Sites Groups', value: 'sitesManagerGetSitesGroupsGet', action: 'Gets sites groups', description: 'Gets the list of site groups in Matomo' },
          { name: 'Get Sites ID From Site URL', value: 'sitesManagerGetSitesIdFromSiteUrlGet', action: 'Gets sites ID from site URL', description: 'Gets the site IDs based on a specific URL' },
          { name: 'Get Sites ID With Admin Access', value: 'sitesManagerGetSitesIdWithAdminAccessGet', action: 'Gets sites ID with admin access', description: 'Gets the site IDs with admin access' },
          { name: 'Get Sites ID With At Least View Access', value: 'sitesManagerGetSitesIdWithAtLeastViewAccessGet', action: 'Gets sites ID with at least view access', description: 'Gets the site IDs with at least view access' },
          { name: 'Get Sites ID With View Access', value: 'sitesManagerGetSitesIdWithViewAccessGet', action: 'Gets sites ID with view access', description: 'Gets the site IDs with view access' },
          { name: 'Get Sites ID With Write Access', value: 'sitesManagerGetSitesIdWithWriteAccessGet', action: 'Gets sites ID with write access', description: 'Gets the site IDs with write access' },
          { name: 'Get Sites With Admin Access', value: 'sitesManagerGetSitesWithAdminAccessGet', action: 'Gets sites with admin access', description: 'Gets list of sites with admin access' },
          { name: 'Get Sites With At Least View Access', value: 'sitesManagerGetSitesWithAtLeastViewAccessGet', action: 'Gets sites with at least view access', description: 'Gets list of sites with at least view access' },
          { name: 'Get Sites With Minimum Access', value: 'sitesManagerGetSitesWithMinimumAccessGet', action: 'Gets sites with minimum access', description: 'Gets sites with specified minimum access level' },
          { name: 'Get Sites With View Access', value: 'sitesManagerGetSitesWithViewAccessGet', action: 'Gets sites with view access', description: 'Gets list of sites with view access' },
          { name: 'Get Timezone Name', value: 'sitesManagerGetTimezoneNameGet', action: 'Gets timezone name', description: 'Gets the name of a timezone for a given country and timezone' },
          { name: 'Get Timezones List', value: 'sitesManagerGetTimezonesListGet', action: 'Gets timezones list', description: 'Gets the list of timezones available in Matomo' },
          { name: 'Get Unique Site Timezones', value: 'sitesManagerGetUniqueSiteTimezonesGet', action: 'Gets unique site timezones', description: 'Gets unique timezones used by the sites' },
          { name: 'Is Timezone Support Enabled', value: 'sitesManagerIsTimezoneSupportEnabledGet', action: 'Checks if timezone support is enabled', description: 'Checks if timezone support is enabled in Matomo' },
          { name: 'Rename Group', value: 'sitesManagerRenameGroupPost', action: 'Renames group', description: 'Renames a specific site group' },
          { name: 'Set Default Currency', value: 'sitesManagerSetDefaultCurrencyPost', action: 'Sets default currency', description: 'Sets the default currency for all sites' },
          { name: 'Set Default Timezone', value: 'sitesManagerSetDefaultTimezonePost', action: 'Sets default timezone', description: 'Sets the default timezone for all sites' },
          { name: 'Set Global Excluded IPs', value: 'sitesManagerSetGlobalExcludedIpsPost', action: 'Sets global excluded ips', description: 'Sets IPs to be excluded from all sites' },
          { name: 'Set Global Excluded Referrers', value: 'sitesManagerSetGlobalExcludedReferrersPost', action: 'Sets global excluded referrers', description: 'Sets referrers to be excluded from all sites' },
          { name: 'Set Global Excluded User Agents', value: 'sitesManagerSetGlobalExcludedUserAgentsPost', action: 'Sets global excluded user agents', description: 'Sets user agents to be excluded from all sites' },
          { name: 'Set Global Query Param Exclusion', value: 'sitesManagerSetGlobalQueryParamExclusionPost', action: 'Sets global query param exclusion', description: 'Sets global query parameter exclusions' },
          { name: 'Set Global Search Parameters', value: 'sitesManagerSetGlobalSearchParametersPost', action: 'Sets global search parameters', description: 'Sets the global search parameters for all sites' },
          { name: 'Set Keep URL Fragments Global', value: 'sitesManagerSetKeepUrlFragmentsGlobalPost', action: 'Sets keep URL fragments global', description: 'Sets the URL fragment setting globally' },
          { name: 'Set Site Alias URLs', value: 'sitesManagerSetSiteAliasUrlsPost', action: 'Sets site alias urls', description: 'Sets the alias URLs for a specific site' },
          { name: 'Update Site', value: 'sitesManagerUpdateSitePost', action: 'Updates site', description: 'Updates the settings for a specific site' },
        ],
        default: 'sitesManagerAddSitePost',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['tagManager'] } },
        options: [
          { name: 'Add Container', value: 'tagManagerAddContainerPost', action: 'Adds container', description: 'Adds a new container to a site' },
          { name: 'Add Container Tag', value: 'tagManagerAddContainerTagPost', action: 'Adds container tag', description: 'Adds a new tag to a container for a site' },
          { name: 'Add Container Trigger', value: 'tagManagerAddContainerTriggerPost', action: 'Adds container trigger', description: 'Adds a new trigger to a container for a site' },
          { name: 'Add Container Variable', value: 'tagManagerAddContainerVariablePost', action: 'Adds container variable', description: 'Adds a new variable to a container for a site' },
          { name: 'Change Debug Url', value: 'tagManagerChangeDebugUrlPost', action: 'Changes debug URL', description: 'Changes the debug URL for a container for a site' },
          { name: 'Create Container Version', value: 'tagManagerCreateContainerVersionPost', action: 'Creates container version', description: 'Creates a new version of a container for a site' },
          { name: 'Create Default Container For Site', value: 'tagManagerCreateDefaultContainerForSitePost', action: 'Creates default container for site', description: 'Creates a default container for a site' },
          { name: 'Delete Container', value: 'tagManagerContainerDelete', action: 'Deletes container', description: 'Deletes a container from a site' },
          { name: 'Delete Container Tag', value: 'tagManagerContainerTagDelete', action: 'Deletes container tag', description: 'Deletes a tag from a container for a site' },
          { name: 'Delete Container Trigger', value: 'tagManagerContainerTriggerDelete', action: 'Deletes container trigger', description: 'Deletes a trigger from a container for a site' },
          { name: 'Delete Container Variable', value: 'tagManagerContainerVariableDelete', action: 'Deletes container variable', description: 'Deletes a variable from a container for a site' },
          { name: 'Delete Container Version', value: 'tagManagerContainerVersionDelete', action: 'Deletes container version', description: 'Deletes a specific container version for a site' },
          { name: 'Disable Preview Mode', value: 'tagManagerDisablePreviewModePost', action: 'Disables preview mode', description: 'Disables preview mode for a container for a site' },
          { name: 'Enable Preview Mode', value: 'tagManagerEnablePreviewModePost', action: 'Enables preview mode', description: 'Enables preview mode for a container for a site' },
          { name: 'Export Container Version', value: 'tagManagerExportContainerVersionPost', action: 'Exports container version', description: 'Exports a specific container version' },
          { name: 'Get Available Comparisons', value: 'tagManagerAvailableComparisonsGet', action: 'Gets available comparisons', description: 'Gets available comparisons for container tags' },
          { name: 'Get Available Container Variables', value: 'tagManagerAvailableContainerVariablesGet', action: 'Gets available container variables', description: 'Gets the available variables for a container' },
          { name: 'Get Available Contexts', value: 'tagManagerAvailableContextsGet', action: 'Gets available contexts', description: 'Gets the available contexts for a container' },
          { name: 'Get Available Environments', value: 'tagManagerAvailableEnvironmentsGet', action: 'Gets available environments', description: 'Gets the available environments for a container' },
          { name: 'Get Available Environments With Publish Capability', value: 'tagManagerAvailableEnvironmentsWithPublishCapabilityGet', action: 'Gets available environments with publish capability', description: 'Gets environments with publish rights for a site' },
          { name: 'Get Available Tag Fire Limits', value: 'tagManagerAvailableTagFireLimitsGet', action: 'Gets available tag fire limits', description: 'Gets the available fire limits for tags' },
          { name: 'Get Available Tag Types In Context', value: 'tagManagerAvailableTagTypesInContextGet', action: 'Gets available tag types in context', description: 'Gets available tag types for a specific context' },
          { name: 'Get Available Trigger Types In Context', value: 'tagManagerAvailableTriggerTypesInContextGet', action: 'Gets available trigger types in context', description: 'Gets available trigger types for a specific context' },
          { name: 'Get Available Variable Types In Context', value: 'tagManagerAvailableVariableTypesInContextGet', action: 'Gets available variable types in context', description: 'Gets available variable types for a specific context' },
          { name: 'Get Container', value: 'tagManagerContainerGet', action: 'Gets container', description: 'Gets details of a specific container for a site' },
          { name: 'Get Container Embed Code', value: 'tagManagerContainerEmbedCodeGet', action: 'Gets container embed code', description: 'Gets the embed code for a container in a site' },
          { name: 'Get Container Install Instructions', value: 'tagManagerContainerInstallInstructionsGet', action: 'Gets container install instructions', description: 'Gets instructions to install a container for a site' },
          { name: 'Get Container Tag', value: 'tagManagerContainerTagGet', action: 'Gets container tag', description: 'Gets details of a specific tag from a container for a site' },
          { name: 'Get Container Tags', value: 'tagManagerContainerTagsGet', action: 'Gets container tags', description: 'Gets tags from a container for a specific version' },
          { name: 'Get Container Trigger', value: 'tagManagerContainerTriggerGet', action: 'Gets container trigger', description: 'Gets details of a specific trigger in a container for a site' },
          { name: 'Get Container Trigger References', value: 'tagManagerContainerTriggerReferencesGet', action: 'Gets container trigger references', description: 'Gets references of a trigger in a container for a site' },
          { name: 'Get Container Triggers', value: 'tagManagerContainerTriggersGet', action: 'Gets container triggers', description: 'Gets triggers from a container for a site' },
          { name: 'Get Container Variable', value: 'tagManagerContainerVariableGet', action: 'Gets container variable', description: 'Gets details of a specific variable in a container for a site' },
          { name: 'Get Container Variable References', value: 'tagManagerContainerVariableReferencesGet', action: 'Gets container variable references', description: 'Gets references of a variable in a container for a site' },
          { name: 'Get Container Variables', value: 'tagManagerContainerVariablesGet', action: 'Gets container variables', description: 'Gets variables from a container for a site' },
          { name: 'Get Container Version', value: 'tagManagerContainerVersionGet', action: 'Gets container version', description: 'Gets details of a specific container version for a site' },
          { name: 'Get Container Versions', value: 'tagManagerContainerVersionsGet', action: 'Gets container versions', description: 'Gets all versions of a container for a site' },
          { name: 'Get Containers', value: 'tagManagerContainersGet', action: 'Gets containers', description: 'Gets the list of all containers for a site' },
          { name: 'Import Container Version', value: 'tagManagerImportContainerVersionPost', action: 'Imports container version', description: 'Imports a container version from an exported file' },
          { name: 'Pause Container Tag', value: 'tagManagerPauseContainerTagPost', action: 'Pauses container tag', description: 'Pauses a tag in a container for a site' },
          { name: 'Publish Container Version', value: 'tagManagerPublishContainerVersionPost', action: 'Publishes container version', description: 'Publishes a container version for a site' },
          { name: 'Resume Container Tag', value: 'tagManagerResumeContainerTagPost', action: 'Resumes container tag', description: 'Resumes a paused tag in a container for a site' },
          { name: 'Update Container', value: 'tagManagerUpdateContainerPost', action: 'Updates container', description: 'Updates the configuration of an existing container for a site' },
          { name: 'Update Container Tag', value: 'tagManagerUpdateContainerTagPost', action: 'Updates container tag', description: 'Updates an existing tag in a container for a site' },
          { name: 'Update Container Trigger', value: 'tagManagerUpdateContainerTriggerPost', action: 'Updates container trigger', description: 'Updates an existing trigger in a container for a site' },
          { name: 'Update Container Variable', value: 'tagManagerUpdateContainerVariablePost', action: 'Updates container variable', description: 'Updates an existing variable in a container for a site' },
          { name: 'Update Container Version', value: 'tagManagerUpdateContainerVersionPost', action: 'Updates container version', description: 'Updates an existing container version for a site' },
        ],
        default: 'tagManagerAddContainerPost',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['tour'] } },
        options: [
          { name: 'Get Challenges', value: 'tourChallengesGet', action: 'Gets challenges', description: 'Gets the list of challenges available in the Tour plugin' },
          { name: 'Get Level', value: 'tourLevelGet', action: 'Gets tour level', description: 'Gets the current level or progress in the Tour plugin' },
          { name: 'Skip Challenge', value: 'tourSkipChallengePost', action: 'Skips challenge', description: 'Skips a specific challenge in the Tour plugin' }
        ],
        default: 'tourChallengesGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['transition'] } },
        options: [
          { name: 'Get Transitions For Action', value: 'transitionTransitionsForActionGet', action: 'Gets transitions for action', description: 'Gets transitions data for a specific action on a page for a site' },
          { name: 'Get Transitions For Page Title', value: 'transitionTransitionsForPageTitleGet', action: 'Gets transitions for page title', description: 'Gets transitions data for a specific page title for a site' },
          { name: 'Get Transitions For Page Url', value: 'transitionTransitionsForPageUrlGet', action: 'Gets transitions for page URL', description: 'Gets transitions data for a specific page URL for a site' },
          { name: 'Get Translations', value: 'transitionTranslationsGet', action: 'Gets translations', description: 'Gets translation strings for the transitions module' },
          { name: 'Is Period Allowed', value: 'transitionIsPeriodAllowedGet', action: 'Checks if period is allowed', description: 'Checks if a specific period and date are allowed for the transitions module' }
        ],
        default: 'transitionTransitionsForActionGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['twoFactorAuth'] } },
        options: [
          { name: 'Reset TwoFactorAuth', value: 'twoFactorAuthResetTwoFactorAuthPost', action: 'Resets two factor authentication', description: 'Resets the two factor authentication for a user' }
        ],
        default: 'twoFactorAuthResetTwoFactorAuthPost',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['userCountry'] } },
        options: [
          { name: 'Get City', value: 'userCountryCityGet', action: 'Gets city data', description: 'Gets city data for a site and period' },
          { name: 'Get Continent', value: 'userCountryContinentGet', action: 'Gets continent data', description: 'Gets continent data for a site and period' },
          { name: 'Get Country', value: 'userCountryCountryGet', action: 'Gets country data', description: 'Gets country data for a site and period' },
          { name: 'Get Country Code Mapping', value: 'userCountryCountryCodeMappingGet', action: 'Gets country code mapping', description: 'Gets country code mapping for IP addresses' },
          { name: 'Get Location From IP', value: 'userCountryLocationFromIpGet', action: 'Gets location from IP', description: 'Gets location data from a given IP address' },
          { name: 'Get Number Of Distinct Countries', value: 'userCountryNumberOfDistinctCountriesGet', action: 'Gets number of distinct countries', description: 'Gets the number of distinct countries visiting a site' },
          { name: 'Get Region', value: 'userCountryRegionGet', action: 'Gets region data', description: 'Gets region data for a site and period' },
          { name: 'Set Location Provider', value: 'userCountrySetLocationProviderPost', action: 'Sets location provider', description: 'Sets the location provider for user geolocation data' }
        ],
        default: 'userCountryCityGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['userId'] } },
        options: [
          { name: 'Get Users', value: 'userIdUsersGet', action: 'Gets users', description: 'Gets the list of users for a site and period' }
        ],
        default: 'userIdUsersGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['usersFlow'] } },
        options: [
          { name: 'Get Available Data Sources', value: 'usersFlowAvailableDataSourcesGet', action: 'Gets available data sources', description: 'Gets the available data sources for users flow' },
          { name: 'Get Interaction Actions', value: 'usersFlowInteractionActionsGet', action: 'Gets interaction actions', description: 'Gets user interaction data for a specific action' },
          { name: 'Get Users Flow', value: 'usersFlowUsersFlowGet', action: 'Gets users flow', description: 'Gets detailed data of user flow through a site' },
          { name: 'Get Users Flow Pretty', value: 'usersFlowUsersFlowPrettyGet', action: 'Gets users flow pretty', description: 'Gets a pretty formatted flow of user actions on a site' }
        ],
        default: 'usersFlowAvailableDataSourcesGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['usersManager'] } },
        options: [
          { name: 'Add Capabilities', value: 'usersManagerAddCapabilitiesPost', action: 'Adds capabilities', description: 'Adds capabilities to a user' },
          { name: 'Add User', value: 'usersManagerAddUserPost', action: 'Adds user', description: 'Adds a new user to Matomo' },
          { name: 'Delete User', value: 'usersManagerUserDelete', action: 'Deletes user', description: 'Deletes a specific user from Matomo' },
          { name: 'Get Available Capabilities', value: 'usersManagerAvailableCapabilitiesGet', action: 'Gets available capabilities', description: 'Gets the available capabilities for users in Matomo' },
          { name: 'Get Available Roles', value: 'usersManagerAvailableRolesGet', action: 'Gets available roles', description: 'Gets the available roles for users in Matomo' },
          { name: 'Get Sites Access For User', value: 'usersManagerSitesAccessForUserGet', action: 'Gets sites access for user', description: 'Gets the access level for a specific user across websites' },
          { name: 'Get Sites Access From User', value: 'usersManagerSitesAccessFromUserGet', action: 'Gets sites access from user', description: 'Gets the websites a user has access to' },
          { name: 'Get User', value: 'usersManagerUserGet', action: 'Gets user', description: 'Gets details for a specific user' },
          { name: 'Get User By Email', value: 'usersManagerUserByEmailGet', action: 'Gets user by email', description: 'Gets user details based on email address' },
          { name: 'Get User Login From User Email', value: 'usersManagerUserLoginFromUserEmailGet', action: 'Gets user login from user email', description: 'Gets the login of a user based on email address' },
          { name: 'Get User Preference', value: 'usersManagerUserPreferenceGet', action: 'Gets user preference', description: 'Gets a specific preference for a user' },
          { name: 'Get Users', value: 'usersManagerUsersGet', action: 'Gets users', description: 'Gets a list of all users in Matomo' },
          { name: 'Get Users Access From Site', value: 'usersManagerUsersAccessFromSiteGet', action: 'Gets users access from site', description: 'Gets users with access to a specific site' },
          { name: 'Get Users Having Super User Access', value: 'usersManagerUsersHavingSuperUserAccessGet', action: 'Gets users with super user access', description: 'Gets a list of users with super user access' },
          { name: 'Get Users Login', value: 'usersManagerUsersLoginGet', action: 'Gets user login', description: 'Gets a list of all user logins' },
          { name: 'Get Users Plus Role', value: 'usersManagerUsersPlusRoleGet', action: 'Gets users with roles', description: 'Gets a list of users along with their roles for a site' },
          { name: 'Get Users Sites From Access', value: 'usersManagerUsersSitesFromAccessGet', action: 'Gets users from site access', description: 'Gets users with access to specific sites' },
          { name: 'Get Users With Site Access', value: 'usersManagerUsersWithSiteAccessGet', action: 'Gets users with site access', description: 'Gets users with access to specific websites' },
          { name: 'Has Super User Access', value: 'usersManagerHasSuperUserAccessGet', action: 'Checks if user has super user access', description: 'Checks if a user has super user access' },
          { name: 'Invite User', value: 'usersManagerInviteUserPost', action: 'Invites user', description: 'Sends an invitation to a new user' },
          { name: 'Set Super User Access', value: 'usersManagerSetSuperUserAccessPost', action: 'Sets super user access', description: 'Grants or revokes super user access for a user' },
          { name: 'Set User Access', value: 'usersManagerSetUserAccessPost', action: 'Sets user access', description: 'Sets access level for a user to a specific website' },
          { name: 'Set User Preference', value: 'usersManagerSetUserPreferencePost', action: 'Sets user preference', description: 'Sets a specific preference for a user' },
          { name: 'Update User', value: 'usersManagerUpdateUserPost', action: 'Updates user', description: 'Updates details for a specific user' },
          { name: 'User Email Exists', value: 'usersManagerUserEmailExistsPost', action: 'Checks if user email exists', description: 'Checks if a user exists based on email address' },
          { name: 'User Exists', value: 'usersManagerUserExistsPost', action: 'Checks if user exists', description: 'Checks if a user exists based on login' }
        ],
        default: 'usersManagerAddCapabilitiesPost',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['visitFrequency'] } },
        options: [
          { name: 'Get Visit Frequency Data', value: 'visitFrequencyGet', action: 'Gets visit frequency data', description: 'Gets metrics related to returning visitors for a site' }
        ],
        default: 'visitFrequencyGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['visitTime'] } },
        options: [
          { name: 'Get By Day Of Week', value: 'visitTimeByDayOfWeekGet', action: 'Gets visit data by day of week', description: 'Gets visit data categorized by day of the week for a site and period' },
          { name: 'Get Visit Information Per Local Time', value: 'visitTimeVisitInformationPerLocalTimeGet', action: 'Gets visits by days since last', description: 'Gets number of visits based on days since the last visit for a site' },
          { name: 'Get Visit Information Per Server Time', value: 'visitTimeVisitInformationPerServerTimeGet', action: 'Gets visit information per server time', description: 'Gets visit data per server time for a site and period' }
        ],
        default: 'visitTimeByDayOfWeekGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['visitorInterest'] } },
        options: [
          { name: 'Get Number Of Visits By Days Since Last', value: 'visitorInterestNumberOfVisitsByDaysSinceLastGet', action: 'Gets visits by days since last', description: 'Gets number of visits based on days since the last visit for a site' },
          { name: 'Get Number Of Visits By Visit Count', value: 'visitorInterestNumberOfVisitsByVisitCountGet', action: 'Gets visits by visit count', description: 'Gets number of visits categorized by visit count for a site' },
          { name: 'Get Number Of Visits Per Page', value: 'visitorInterestNumberOfVisitsPerPageGet', action: 'Gets visits per page', description: 'Gets number of visits per page for a site' },
          { name: 'Get Number Of Visits Per Visit Duration', value: 'visitorInterestNumberOfVisitsPerVisitDurationGet', action: 'Gets visits per duration', description: 'Gets number of visits based on visit duration for a site' }
        ],
        default: 'visitorInterestNumberOfVisitsByDaysSinceLastGet',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['visitsSummary'] } },
        options: [
          { name: 'Get Actions', value: 'visitsSummaryActionsGet', action: 'Gets actions data', description: 'Gets the number of actions (page views, downloads, clicks) for a site' },
          { name: 'Get Bounce Count', value: 'visitsSummaryBounceCountGet', action: 'Gets bounce count', description: 'Gets the number of bounces (single-page visits) for a site' },
          { name: 'Get Core Web Metrics', value: 'visitsSummaryGet', action: 'Gets core web metrics', description: 'Gets core web analytics metrics such as visits, unique visitors, time on site, etc' },
          { name: 'Get Max Actions', value: 'visitsSummaryMaxActionsGet', action: 'Gets max actions', description: 'Gets the maximum number of actions for a site and period' },
          { name: 'Get Sum Visits Length', value: 'visitsSummarySumVisitsLengthGet', action: 'Gets total visits length', description: 'Gets the total time spent during visits for a site' },
          { name: 'Get Sum Visits Length Pretty', value: 'visitsSummarySumVisitsLengthPrettyGet', action: 'Gets total visits length pretty', description: 'Gets the total time spent during visits with a user-friendly format for a site' },
          { name: 'Get Unique Visitors', value: 'visitsSummaryUniqueVisitorsGet', action: 'Gets unique visitors', description: 'Gets the number of unique visitors for a site and period' },
          { name: 'Get Users', value: 'visitsSummaryUsersGet', action: 'Gets user data', description: 'Gets user-related metrics for a site and period' },
          { name: 'Get Visits', value: 'visitsSummaryVisitsGet', action: 'Gets visits data', description: 'Gets total number of visits for a site and period' },
          { name: 'Get Visits Converted', value: 'visitsSummaryVisitsConvertedGet', action: 'Gets converted visits', description: 'Gets the number of visits with conversions for a site' }
        ],
        default: 'visitsSummaryActionsGet',
      },
      {
        displayName: 'Query Parameters',
        name: 'queryParameters',
        type: 'collection',
        placeholder: 'Add Query Parameters',
        default:{},
        options:[
          {
            displayName: 'Abandoned Carts',
            name: 'abandonedCarts',
            description: 'Whether to return metrics for abandoned carts instead of purchases',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Access',
            name: 'access',
            description: 'Access level to grant or filter by (e.g. view, write, admin)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Account ID',
            name: 'accountId',
            description: 'Unique identifier for a Google Tag Manager account',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Action Name',
            name: 'actionName',
            description: 'Page title to track',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Action Type',
            name: 'actionType',
            description: 'Type of the action (e.g. pageview, download, outlink) for Transitions',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Active',
            name: 'active',
            description: 'Whether the custom dimension is enabled or disabled',
            type: 'boolean',
            default: false
          },          
          {
            displayName: 'Actively Sync GTM DataLayer',
            name: 'activelySyncGtmDataLayer',
            description: 'Whether to actively sync the GTM dataLayer',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Add Default Widgets',
            name: 'addDefaultWidgets',
            description: 'Whether to pre-populate a new dashboard with default widgets',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Additional Emails',
            name: 'additionalEmails',
            description: 'List of additional email addresses to notify',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Aliased Graph',
            name: 'aliasedGraph',
            description: 'Whether to enable anti-aliasing/smoothing',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Allow Multiple Conversions Per Visit',
            name: 'allowMultipleConversionsPerVisit',
            description: 'Whether to allow more than one conversion per visit',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Anonymize IP',
            name: 'anonymizeIp',
            description: 'Whether to anonymize visitor IP addresses for the selected data when set',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Anonymize Location',
            name: 'anonymizeLocation',
            description: 'Whether to anonymize visitor location data (country/region/city) when set',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Anonymize User ID',
            name: 'anonymizeUserId',
            description: 'Whether to anonymize the user ID dimension when set',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Api Action',
            name: 'apiAction',
            description: 'The specific method exposed by a module',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Api Module',
            name: 'apiModule',
            description: 'The plugin or area of functionality',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Api Parameters',
            name: 'apiParameters',
            description: 'The parameters of the API',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Auto Archive',
            name: 'autoArchive',
            description: 'Whether to pre-process archives for this segment when false',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Background Color',
            name: 'backgroundColor',
            description: 'Hex background color (e.g. FFFFFF)',
            type: 'color',
            default: ''
          },
          {
            displayName: 'Backup Name',
            name: 'backupName',
            description: 'Optional name for the backup created during import',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Block Trigger IDs',
            name: 'blockTriggerIds',
            description: 'IDs of triggers that should block the tag',
            type: 'string',
            default: ''
          },   
          {
            displayName: 'Breakpoint Mobile',
            name: 'breakpointMobile',
            description: 'The pixel width defining the mobile device breakpoint for responsive heatmap targeting',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Breakpoint Tablet',
            name: 'breakpointTablet',
            description: 'The pixel width defining the tablet device breakpoint for responsive heatmap targeting',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Capabilities',
            name: 'capabilities',
            description: 'Array of capability flags to add or remove',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Capture DOM Manually',
            name: 'captureDomManually',
            description: 'Whether the DOM should be manually captured for a heatmap instead of automatically',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Capture Keystrokes',
            name: 'captureKeystrokes',
            description: 'Whether user keystrokes should be captured during session recordings',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Case Sensitive',
            name: 'caseSensitive',
            description: 'Whether to treat text as case-sensitive during the extraction process',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Category ID',
            name: 'categoryId',
            description: 'Category under which the report is grouped in the UI',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Choice',
            name: 'choice',
            description: 'User selected choice or feedback option',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Colors',
            name: 'colors',
            description: 'Comma-separated hex colors overriding defaults',
            type: 'color',
            default: ''
          },
          {
            displayName: 'Columns',
            name: 'columns',
            description: 'Column names to return (separated by a comma)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Compare',
            name: 'compare',
            description: 'Whether to return comparison data versus a previous period when set',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Compared To',
            name: 'comparedTo',
            description: 'Determines the comparison basis (e.g., previous period, same day last week',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Compared To X Periods',
            name: 'comparedToXPeriods',
            description: 'Number of past periods used for comparison (default 1)',
            type: 'number',
            default: 1
          },
          {
            displayName: 'Conditions',
            name: 'conditions',
            description: 'Array of condition objects used by a trigger',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Confidence Threshold',
            name: 'confidenceThreshold',
            description: 'The threshold of statistical confidence used to determine if the A/B test results are statistically significant',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Container ID',
            name: 'containerId',
            description: 'Identifier for a specific GTM container',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Context',
            name: 'context',
            description: 'Container context (e.g. web, mobile) when creating a container',            
            type: 'options',
            options: [
              { name: 'Mobile', value: 'mobile'},
              { name: 'Web', value: 'web'}
            ],
            default: 'web'
          },
          {
            displayName: 'Conversion Rule Option',
            name: 'conversionRuleOption',
            description: 'How a conversion is counted (e.g. page_visit, form_submit)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Conversion Rules',
            name: 'conversionRules',
            description: 'Optional detailed conversion rules when conversionRuleOption requires them',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Copy To User',
            name: 'copyToUser',
            description: 'Login of the user to whom the dashboard is copied',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Count Visitors To Fetch',
            name: 'countVisitorsToFetch',
            description: 'Max number of visits to return',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Country Code',
            name: 'countryCode',
            description: 'Country code used to resolve a timezone name',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Credentials',
            name: 'credentials',
            description: 'Key/value credential payload required by the SMS provider (API key, token, etc.)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Cross Domain',
            name: 'crossDomain',
            description: 'Whether to enable cross-domain linking support',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Currency',
            name: 'currency',
            description: 'Currency code (e.g. USD, EUR)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Custom Campaign Keyword Param',
            name: 'customCampaignKeywordParam',
            description: 'Custom query parameter for campaign keyword',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Custom Campaign Name Query Param',
            name: 'customCampaignNameQueryParam',
            description: 'Custom query parameter for campaign name',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Dashboard Name',
            name: 'dashboardName',
            description: 'Name of the dashboard',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Data Source',
            name: 'dataSource',
            description: 'Users Flow data source to query (e.g. interactions vs pages)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Date',
            name: 'date',
            description: 'Standard format (YYYY-MM-DD)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Default Currency',
            name: 'defaultCurrency',
            description: 'Set the global default currency',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Default Timezone',
            name: 'defaultTimezone',
            description: 'Set the global default timezone',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Default Value',
            name: 'defaultValue',
            description: 'Fallback value for a variable when resolution fails',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Definition',
            name: 'definition',
            description: 'Segment definition (Matomo segment expression)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Delegated Management',
            name: 'delegatedManagement',
            description: 'Whether SMS management is delegated to users',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Depth',
            name: 'depth',
            description: 'Defines how many hierarchical levels of subtables to return',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Description',
            name: 'description',
            description: 'The description of the element',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Device Type',
            name: 'deviceType',
            description: 'The device type filter for data (e.g., desktop, mobile, tablet)',            
            type: 'options',
            options: [
              { name: 'Desktop', value: 'desktop'},
              { name: 'Mobile', value: 'mobile'},
              { name: 'Tablet', value: 'tablet'}
            ],
            default: 'desktop'
          },
          {
            displayName: 'Dimension IDs',
            name: 'dimensionIds',
            description: 'Array or comma-separated list of dimension IDs',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Disable Campaign Parameters',
            name: 'disableCampaignParameters',
            description: 'Whether to ignore campaign parameters when true',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Disable Cookies',
            name: 'disableCookies',
            description: 'Whether to disable first-party cookies for this tag',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Do Not Fetch Actions',
            name: 'doNotFetchActions',
            description: 'Whether to skip fetching action details for speed',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Do Not Track',
            name: 'doNotTrack',
            description: 'Whether to enable Do Not Track handling in the tag',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Download URL',
            name: 'downloadUrl',
            description: 'The URL of the download',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Ecommerce',
            name: 'ecommerce',
            description: 'Whether to enable Ecommerce tracking for the site',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Email',
            name: 'email',
            description: 'User email address',
            placeholder: 'name@email.com',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Email Me',
            name: 'emailMe',
            description: 'Whether an email notification should be sent to the user triggering the alert',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Enabled',
            name: 'enabled',
            description: 'Whether to toggle a global feature or flag',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Enabled All Users',
            name: 'enabledAllUsers',
            description: 'Whether to make the segment available to all users when true',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'End Date',
            name: 'endDate',
            description: 'The end date of the element',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Enhanced',
            name: 'enhanced',
            description: 'Whether to enrich visits with additional derived fields',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Environment',
            name: 'environment',
            description: 'Get environment for embed/publish (e.g. live, staging)',                       
            type: 'options',
            options: [
              { name: 'Dev', value: 'dev'},
              { name: 'Live', value: 'live'},
              { name: 'Staging', value: 'staging'}
            ],
            default: 'dev'
          },
          {
            displayName: 'Evolution Period For',
            name: 'evolutionPeriodFor',
            description: 'Baseline period for evolution metrics (prev, previousYear, etc.)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Evolution Period N',
            name: 'evolutionPeriodN',
            description: 'Number of periods used for evolution comparison',
            type: 'number',
            default: ''
          },
          {
            displayName: 'Exclude ID Log Crashes',
            name: 'excludeIdLogCrashes',
            description: 'A list of crash IDs to exclude from the results',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Exclude Non Core Plugins',
            name: 'excludeNonCorePlugins',
            description: 'Whether to omit non-core plugin languages from the information',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Exclude Unknown URLs',
            name: 'excludeUnknownUrls',
            description: 'Whether to reject hits from URLs not listed in the site URLs',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Excluded Elements',
            name: 'excludedElements',
            description: 'A list of CSS selectors for page elements to exclude from recording',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Excluded IPs',
            name: 'excludedIps',
            description: 'IPs or ranges to exclude for this site',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Excluded Query Parameters',
            name: 'excludedQueryParameters',
            description: 'Site-level URL parameters to exclude',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Excluded Query Params',
            name: 'excludedQueryParams',
            description: 'Query parameters to strip from tracked URLs (comma-separated)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Excluded Referrers',
            name: 'excludedReferrers',
            description: 'Referrer hosts or patterns to ignore (comma-separated)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Excluded Targets',
            name: 'excludedTargets',
            description: 'A list of user segments or conditions that define which visitors should be excluded from the experiment',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Excluded User Agents',
            name: 'excludedUserAgents',
            description: 'User-agent substrings to exclude',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Exclusion Type',
            name: 'exclusionType',
            description: 'Output format',                       
            type: 'options',
            options: [
              { name: 'Matomo Recommended PII', value: 'matomo_recommended_pii'},
              { name: 'Common Session Parameters', value: 'common_session_parameters'},
              { name: 'Custom', value: 'custom'}
            ],
            default: 'matomo_recommended_pii'
          },
          {
            displayName: 'Expanded',
            name: 'expanded',
            description: 'Whether returned data includes the first-level results as well as all sub-tables',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Expire Date',
            name: 'expireDate',
            description: 'Expiration date (YYYY-MM-DD) for a generated token or invite',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Expire Hours',
            name: 'expireHours',
            description: 'Hours until expiration for a generated token',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Explore Step',
            name: 'exploreStep',
            description: 'Step number in the funnel/flow to drill into for Users Flow',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Explore URL',
            name: 'exploreUrl',
            description: 'Specific URL to explore within a Users Flow report',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Exported Container Version',
            name: 'exportedContainerVersion',
            description: 'Export payload used to import a container version',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Extractions',
            name: 'extractions',
            description: 'Array of extraction rules defining how data is pulled',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Feature Name',
            name: 'featureName',
            description: 'The name of the feature',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Fetch Alias URLs',
            name: 'fetchAliasUrls',
            description: 'Whether to also return alias URLs when listing sites with access',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Fetch Recent Actions',
            name: 'fetchRecentActions',
            description: 'Whether to fetch the most recent actions associated with a crash',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Fields',
            name: 'fields',
            description: 'Array of field objects (e.g. {fieldName, displayName}) to update display names',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Filter By',
            name: 'filterBy',
            description: 'Restrict results to a subset (e.g. new, disappeared, movers)',            
            type: 'options',
            options: [
              { name: 'Disappeared', value: 'disappeared'},
              { name: 'New', value: 'new'},
              { name: 'Movers', value: 'movers'}
            ],
            default: 'disappeared'
          },
          {
            displayName: 'Filter By Activity Type',
            name: 'filterByActivityType',
            description: 'Filters the results based on a specific activity type in the activity log',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Filter By User Login',
            name: 'filterByUserLogin',
            description: 'Filters the results based on a specific user login',
            type: 'string',
            default: ''
          }, 
          {
            displayName: 'Filter Limit',
            name: 'filterLimit',
            description: 'Defines an additional filter to limit the number of items retrieved',
            type: 'string',
            default: '-1'
          },       
          {
            displayName: 'Filter_access',
            name: 'filter_access',
            description: 'Filter users by access level (e.g. view, write, admin)',
            type: 'string',
            default: '100'
          },  
          {
            displayName: 'Filter_limit',
            name: 'filter_limit',
            description: 'Defines the number of rows to be returned',
            type: 'string',
            default: '100'
          },      
          {
            displayName: 'Filter_offset',
            name: 'filter_offset',
            description: 'Offsets the results by a specified number',
            type: 'string',
            default: ''
          },   
          {
            displayName: 'Filter_search',
            name: 'filter_search',
            description: 'Free-text search term to filter user lists',
            type: 'string',
            default: ''
          },       
          {
            displayName: 'Filter_sort_column',
            name: 'filter_sort_column',
            description: 'Determines which field is used for ordering the returned rows',
            type: 'string',
            default: ''
          },       
          {
            displayName: 'Filter_sort_order',
            name: 'filter_sort_order',
            description: 'Determines which field is used for ordering the returned rows',
            type: 'options',
            options: [
              {
                name: 'Ascending',
                value: 'asc'
              },
              {
                name: 'Descending',
                value: 'desc'
              },
            ],
            default: 'desc'
          },   
          {
            displayName: 'Filter_status',
            name: 'filter_status',
            description: 'Filter users by status (e.g. active, inactive, if supported)',
            type: 'string',
            default: ''
          },    
          {
            displayName: 'Fire Delay',
            name: 'fireDelay',
            description: 'Delay (ms) before the tag fires',
            type: 'string',
            default: ''
          },   
          {
            displayName: 'Fire Limit',
            name: 'fireLimit',
            description: 'How often a tag may fire (e.g. unlimited, once_per_page)',
            type: 'string',
            default: ''
          },   
          {
            displayName: 'Fire Trigger IDs',
            name: 'fireTriggerIds',
            description: 'IDs of triggers that should fire the tag',
            type: 'string',
            default: ''
          },   
          {
            displayName: 'Flat',
            name: 'flat',
            description: 'Whether returned data includes a flattened view of the table data set',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Font Size',
            name: 'fontSize',
            description: 'Base font size for axis/labels',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Force',
            name: 'force',
            description: 'Whether to force sending even outside the usual schedule when set',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Force Matomo Endpoint',
            name: 'forceMatomoEndpoint',
            description: 'Whether to force requests to go directly to Matomo, bypassing proxies/CDN',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Format',
            name: 'format',
            description: 'Defines the format of the output',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Format_metrics',
            name: 'format_metrics',
            description: 'Defines the output format of the metrics values',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Forward All Query Params',
            name: 'forwardAllQueryParams',
            description: 'Whether to forward all query parameters',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Forward UTM Params',
            name: 'forwardUtmParams',
            description: 'Whether to forward utm parameters',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Funnel Name',
            name: 'funnelName',
            description: 'The name of the funnel',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Get Annotation Text',
            name: 'getAnnotationText',
            description: 'Whether the text content of annotations should be included in the response',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Graph Type',
            name: 'graphType',
            description: 'The type of the graph',            
            type: 'options',
            options: [
              { name: 'Evolution', value: 'evolution'},
              { name: 'Vertical Bar', value: 'verticalBar'},
              { name: 'Pie', value: 'pie'},
              { name: '3D Pie', value: '3dPie'}
            ],
            default: 'evolution'
          },
          {
            displayName: 'Grid Color',
            name: 'gridColor',
            description: 'Hex color for grid lines (e.g. CCCCCC)',
            type: 'color',
            default: ''
          },
          {
            displayName: 'Group',
            name: 'group',
            description: 'Site group name',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Group Page Titles By Domain',
            name: 'groupPageTitlesByDomain',
            description: 'Whether to prefix page titles with the domain when true',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Has Super User Access',
            name: 'hasSuperUserAccess',
            description: 'Whether to grant or revoke superuser access',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Heatmap Type',
            name: 'heatmapType',
            description: 'The type of heatmap (e.g., click, move, scroll)',            
            type: 'options',
            options: [
              { name: 'Click', value: 'click'},
              { name: 'Move', value: 'move'},
              { name: 'Scroll', value: 'scroll'}
            ],
            default: 'click'
          },
          {
            displayName: 'Height',
            name: 'height',
            description: 'Image height in pixels',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Hide Columns',
            name: 'hideColumns',
            description: 'Array of column names to exclude in counters',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Hide Future Hours When Today',
            name: 'hideFutureHoursWhenToday',
            description: 'Whether to hide future hours in today’s server-time report',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Hide Metrics Doc',
            name: 'hideMetricsDoc',
            description: 'Whether to hide the metrics documentation',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Hour',
            name: 'hour',
            description: 'Hour (0–23) the scheduled email should be sent',
            type: 'number',
            default: 0
          },
          {
            displayName: 'Hypothesis',
            name: 'hypothesis',
            description: 'The hypothesis of the element',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID',
            name: 'id',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Alert',
            name: 'idAlert',
            description: 'The ID of the alert',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Campaign Dimension Combination',
            name: 'idCampaignDimensionCombination',
            description: 'Campaign dimension combo key to attribute against (e.g., source+medium+name)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Container',
            name: 'idContainer',
            description: 'The ID of the container',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Container Version',
            name: 'idContainerVersion',
            description: 'The ID of the container version',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Context',
            name: 'idContext',
            description: 'The ID of the context',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Custom Report',
            name: 'idCustomReport',
            description: 'The ID of the custom report',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Dashboard',
            name: 'idDashboard',
            description: 'The ID of the dashboard',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Destination Sites',
            name: 'idDestinationSites',
            description: 'Array of site IDs to which a custom report should be duplicated',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Dimension',
            name: 'idDimension',
            description: 'The ID of the dimension',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Experiment',
            name: 'idExperiment',
            description: 'The ID of the experiment',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Export',
            name: 'idExport',
            description: 'The ID of the export',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Failure',
            name: 'idFailure',
            description: 'The ID of the specific failure',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Form',
            name: 'idForm',
            description: 'The ID of the form',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Funnel',
            name: 'idFunnel',
            description: 'The ID of the funnel',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Goal',
            name: 'idGoal',
            description: 'The ID of the goal',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Log Crash',
            name: 'idLogCrash',
            description: 'Identifies the specific crash logs to query',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Log Crashes',
            name: 'idLogCrashes',
            description: 'Identifies the specific crashes logs to query',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Log Heatmap Session Recording (HSR)',
            name: 'idLogHsr',
            description: 'The ID of a specific recorded session or heatmap activity',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Note',
            name: 'idNote',
            description: 'The ID of the note',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Report',
            name: 'idReport',
            description: 'The ID of the report',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Segment',
            name: 'idSegment',
            description: 'The ID of the segment',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Site',
            name: 'idSite',
            description: 'The integer ID of your website (you can also specify a list of idSites comma-separated and if you want to get data for all websites, set idSite=all)',
            type: 'string',
            default: '1'
          },
          {
            displayName: 'ID Site Heatmap Session Recording (HSR)',
            name: 'idSiteHsr',
            description: 'TThe ID of the specific heatmap or session recording configuration',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Sites',
            name: 'idSites',
            description: 'The integer ID of your website (you can also specify a list of idSites comma-separated and if you want to get data for all websites, set idSite=all)',
            type: 'string',
            default: '1'
          },
          {
            displayName: 'ID Subtable',
            name: 'idSubtable',
            description: 'The ID of the subtable',
            type: 'string',
            default: '1'
          },
          {
            displayName: 'ID Tag',
            name: 'idTag',
            description: 'The ID of the tag',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Trigger',
            name: 'idTrigger',
            description: 'The ID of the trigger',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Variable',
            name: 'idVariable',
            description: 'The ID of the variable',
            type: 'string',
            default: ''
          },
          {
            displayName: 'ID Visit',
            name: 'idVisit',
            description: 'The ID of the visit',
            type: 'string',
            default: '1'
          },
          {
            displayName: 'If Super User Return All Alerts',
            name: 'ifSuperUserReturnAllAlerts',
            description: 'Whether to return all alerts if the user is a super user',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'If Super User Return Only Super User Reports',
            name: 'ifSuperUserReturnOnlySuperUserReports',
            description: 'Whether to return only superuser reports when the user is a superuser and the value is truthy',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Ignore',
            name: 'ignore',
            description: 'Whether to ignore',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Ignore GTM DataLayer',
            name: 'ignoreGtmDataLayer',
            description: 'Whether to ignore the GTM dataLayer if present',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Include Page Tree Mirror',
            name: 'includePageTreeMirror',
            description: 'Whether to include mirrored page tree information when fetching heatmap',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Included Targets',
            name: 'includedTargets',
            description: 'A list of user segments or conditions that define which visitors are included in the experiment',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Initial ID Site',
            name: 'initialIdSite',
            description: 'Site ID to assign on user creation (optional)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Interaction Position',
            name: 'interactionPosition',
            description: 'Position index of the interaction step to fetch in Users Flow',
            type: 'string',
            default: ''
          },
          {
            displayName: 'IP',
            name: 'ip',
            description: 'IP address to geolocate',
            type: 'string',
            default: ''
          },
          {
            displayName: 'IP Range',
            name: 'ipRange',
            description: 'CIDR/range to expand into IP addresses',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Is Activated',
            name: 'isActivated',
            description: 'Whether the goal funnel should be active',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Is Enabled',
            name: 'isEnabled',
            description: 'Whether to enable or disable a feature (e.g., goal attribution) for the site or goal',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Is Tag Fire Limit Allowed In Preview Mode',
            name: 'isTagFireLimitAllowedInPreviewMode',
            description: 'Whether to allow fire limits in preview',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'JS Framework',
            name: 'jsFramework',
            description: 'Optional JS framework hint for install instructions (e.g. react, vue)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Keep URL Fragments',
            name: 'keepURLFragments',
            description: 'Whether to keep URL fragments (#…) in reports',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Label',
            name: 'label',
            description: 'The label used for categorization or identification of the data',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Label Series',
            name: 'labelSeries',
            description: 'The label used to represent a series of data points',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Label Use Absolute URL',
            name: 'labelUseAbsoluteUrl',
            description: 'Whether to use an absolute URL for the label',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Labels',
            name: 'labels',
            description: 'Optional label overrides for series (comma-separated)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Language',
            name: 'language',
            description: 'Returns data strings that can be internationalized and will be translated (expected value is the 2 language letters code, eg. en, fr, de, es, etc.).',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Language Code',
            name: 'languageCode',
            description: 'Language code (e.g. en, fr)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Last Minutes',
            name: 'lastMinutes',
            description: 'Defines the time window, in minutes, for fetching recent data',
            type: 'number',
            default: 30
          },
          {
            displayName: 'Last N',
            name: 'lastN',
            description: 'The number of entries or annotations to fetch, often used as a limit on the results',
            type: 'number',
            default: 5
          },
          {
            displayName: 'Legend Append Metric',
            name: 'legendAppendMetric',
            description: 'Whether to append the metric to the legend',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Legend Font Size',
            name: 'legendFontSize',
            description: 'Font size for legend text',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Like',
            name: 'like',
            description: 'Whether the feedback is positive or negative',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Limit',
            name: 'limit',
            description: 'Defines the maximum number of results to return in the API response',
            type: 'string',
            default: '25'
          },
          {
            displayName: 'Limit Actions Per Step',
            name: 'limitActionsPerStep',
            description: 'Max number of actions to show per step in Users Flow',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Limit Before Grouping',
            name: 'limitActionsPerStep',
            description: 'Minimum row count before grouping “others” in Transitions',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Limit Decreaser',
            name: 'limitDecreaser',
            description: 'Max declining items to return',
            type: 'number',
            default: ''
          },
          {
            displayName: 'Limit Increaser',
            name: 'limitIncreaser',
            description: 'Max rising items to return',
            type: 'number',
            default: ''
          },
          {
            displayName: 'Limit Visits',
            name: 'limitVisits',
            description: 'Max number of visits in a visitor profile response',
            type: 'number',
            default: ''
          },
          {
            displayName: 'Login',
            name: 'login',
            description: 'Matomo login of the user (owner/target) for dashboard operations',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Lookup Table',
            name: 'lookupTable',
            description: 'Array mapping input values to outputs for a variable',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Match Attribute',
            name: 'matchAttribute',
            description: 'What to match to convert (e.g., URL, title, event, visitDuration)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Match Form Rules',
            name: 'matchFormRules',
            description: 'Rule set describing how the form is identified (form selectors/conditions)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Match Page Rules',
            name: 'matchPageRules',
            description: 'Rule set describing on which pages the form is active',
            type: 'string',
            default: ''
          },
          {
            displayName: 'MDE Relative',
            name: 'mdeRelative',
            description: 'The Minimum Detectable Effect (MDE) in relative terms',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Merge Alias URLs',
            name: 'mergeAliasUrls',
            description: 'Whether to treat alias URLs as the same site in reports when true',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Merge Subdomains',
            name: 'mergeSubdomains',
            description: 'Whether to track all subdomains as a single site when true',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Message',
            name: 'message',
            description: 'The text message of the feedback, describing user input or comments',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Metric',
            name: 'metric',
            description: 'The metric on which the alert condition is based (e.g., visits, conversions)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Metric Condition',
            name: 'metricCondition',
            description: 'The logical condition applied to the metric (e.g., greater than, less than)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Metric IDs',
            name: 'metricIds',
            description: 'Comma-separated metric IDs to include',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Metric Value',
            name: 'metricValue',
            description: 'The threshold value for the selected metric',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Min Growth Percent',
            name: 'minGrowthPercent',
            description: 'Minimum growth/decline (in %) to consider an item',
            type: 'number',
            default: ''
          },
          {
            displayName: 'Min Impact Percent',
            name: 'minImpactPercent',
            description: 'Minimum traffic share (in %) to consider an item',
            type: 'number',
            default: ''
          },
          {
            displayName: 'Min Session Time',
            name: 'minSessionTime',
            description: 'The minimum duration (in seconds) a visitor session must last to be recorded',
            type: 'number',
            default: ''
          },
          {
            displayName: 'Min Timestamp',
            name: 'minTimestamp',
            description: 'Unix timestamp to fetch visits after',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Multiple ID Sites',
            name: 'multipleIdSites',
            description: 'Array of site IDs when creating/updating a report intended for multiple sites',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Multiple Timezones In Country',
            name: 'multipleTimezonesInCountry',
            description: 'Whether a country spans multiple timezones',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Name',
            name: 'name',
            description: 'The name of the element',
            type: 'string',
            default: ''
          },
          {
            displayName: 'New Group Name',
            name: 'newGroupName',
            description: 'New site group name',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Note',
            name: 'note',
            description: 'The note of the element',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Offset',
            name: 'offset',
            description: 'Specifies the starting point for retrieving the results from the API',
            type: 'string',
            default: '0'
          },
          {
            displayName: 'Offset Actions Per Step',
            name: 'offsetActionsPerStep',
            description: 'Number of actions to skip per step (pagination within a step)',
            type: 'string',
            default: '0'
          },
          {
            displayName: 'Old Group Name',
            name: 'oldGroupName',
            description: 'Old site group name',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Order By',
            name: 'orderBy',
            description: 'Sort key for results',            
            type: 'options',
            options: [
              { name: 'Absolute', value: 'absolute'},
              { name: 'Relative', value: 'relative'}
            ],
            default: 'absolute'
          },
          {
            displayName: 'Order By Name',
            name: 'orderByName',
            description: 'Whether to sort the returned goals alphabetically by name',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Outlink URL',
            name: 'outlinkUrl',
            description: 'The URL of the outlink',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Output Type',
            name: 'outputType',
            type: 'string',
            default: '0'
          },
          {
            displayName: 'Page Custom Variables',
            name: 'pageCustomVariables',
            description: 'Array of custom page variables to embed in the tag',
            type: 'string',
            default: ''
          },  
          {
            displayName: 'Page Name',
            name: 'pageName',
            description: 'The Name of the page',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Page Title',
            name: 'pageTitle',
            description: 'Page title to analyze in Transitions',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Page URL',
            name: 'pageUrl',
            description: 'The URL of the page',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Parameters',
            name: 'parameters',
            description: 'The parameters of the element',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Parent Info',
            name: 'parentInfo',
            description: 'Additional information regarding the parent',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Parts',
            name: 'parts',
            description: 'Which Transitions parts to include (e.g. all, internal, external)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Password',
            name: 'password',
            description: 'New user password',
            type: 'string',
						typeOptions: { password: true },
            default: ''
          },
          {
            displayName: 'Password Confirmation',
            name: 'passwordConfirmation',
            description: 'Current superuser password, required to authorize sensitive privacy actions',
            type: 'string',
						typeOptions: { password: true },
            default: ''
          },
          {
            displayName: 'Pattern',
            name: 'pattern',
            description: 'Rattern value to match (exact string, substring, or regex depending on patternType)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Pattern Type',
            name: 'patternType',
            description: 'Pattern matching mode (exact, contains, regex)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Percentage Participants',
            name: 'percentageParticipants',
            description: 'The percentage of visitors (or users) who will be included in the experiment',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Period',
            name: 'period',
            description: 'The period you request the statistics for (Can be any of: day, week, month, year or range)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Period Param',
            name: 'periodParam',
            description: 'Overrides the report’s internal period if needed',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Permission',
            name: 'permission',
            description: 'Minimum permission level to filter sites',            
            type: 'options',
            options: [
              { name: 'View', value: 'view'},
              { name: 'Write', value: 'write'},
              { name: 'Admin', value: 'admin'}
            ],
            default: 'view'
          },
          {
            displayName: 'Phone Number',
            name: 'phoneNumber',
            description: 'Phone number to send SMS notifications',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Phone Numbers',
            name: 'phoneNumbers',
            description: 'List of phone numbers to send SMS notifications',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Piwik URL',
            name: 'piwikUrl',
            description: 'Base URL of your Matomo instance (used when generating tracking code)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Preference Name',
            name: 'preferenceName',
            description: 'User preference key to get or set',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Preference Value',
            name: 'preferenceValue',
            description: 'User preference key to get or set',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Priority',
            name: 'priority',
            description: 'Tag execution priority (higher runs earlier)',
            type: 'string',
            default: ''
          },   
          {
            displayName: 'Provider',
            name: 'provider',
            description: 'SMS provider identifier (e.g., Twilio, Clockwork',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Provider ID',
            name: 'providerId',
            description: 'ID of the location provider to set as active',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Query Params To Exclude',
            name: 'queryParamsToExclude',
            description: 'Query parameters to exclude globally',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Question',
            name: 'question',
            description: 'The specific survey question the feedback refers to',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Report Condition',
            name: 'reportCondition',
            description: 'Condition applied to the report data (e.g., “equals”, “contains”)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Report Format',
            name: 'reportFormat',
            description: 'Output format',                       
            type: 'options',
            options: [
              { name: 'CSV', value: 'csv'},
              { name: 'HTML', value: 'html'},
              { name: 'PDF', value: 'pdf'}
            ],
            default: 'csv'
          },
          {
            displayName: 'Report Mediums',
            name: 'reportMediums',
            description: 'Array of notification channels to use (e.g., email, Slack, SMS)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Report Type',
            name: 'reportType',
            description: 'Visualization type for the report (e.g., table, evolution)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Report Unique ID',
            name: 'reportUniqueId',
            description: 'Identifier of the associated report used to evaluate the alert',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Report Value',
            name: 'reportValue',
            description: 'Specific value in the report data used for comparison',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Reports',
            name: 'reports',
            description: 'List/CSV of report IDs or API methods to include',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Requires Activity',
            name: 'requiresActivity',
            description: 'Whether a session must have user activity (clicks, scrolls, etc.) to be recorded',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Resource URI',
            name: 'resourceUri',
            description: 'URI for the resource',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Return Default If Empty',
            name: 'returnDefaultIfEmpty',
            description: 'Whether to return the default dashboard when the user has none',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Revenue',
            name: 'revenue',
            description: 'Default revenue amount credited per conversion',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Sample Limit',
            name: 'sampleLimit',
            description: 'The maximum number of sessions or interactions to record before stopping data collection',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Sample Rate',
            name: 'sampleRate',
            description: 'The percentage or rate of visitors that will be sampled for recording',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Scope',
            name: 'scope',
            description: 'Defines the data level the custom dimension applies to',
            type: 'options',
            options: [
              { name: 'Action', value: 'action'},
              { name: 'Conversion', value: 'conversion'},
              { name: 'Visit', value: 'visit'}
            ],
            default: 'action'
          },
          {
            displayName: 'Screenshot URL',
            name: 'screenshotUrl',
            description: 'The URL of the screenshot used for visualizing the heatmap',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Search Category Parameters',
            name: 'searchCategoryParameters',
            description: 'Query parameters containing search categories',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Search Keyword Parameters',
            name: 'searchKeywordParameters',
            description: 'Query parameters containing search keywords',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Search Term',
            name: 'searchTerm',
            description: 'Term or keyword to search for when filtering results',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Secondary Dimension',
            name: 'secondaryDimension',
            description: 'Adds a secondary dimension',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Secure Only',
            name: 'secureOnly',
            description: 'Whether to restrict the app-specific token to HTTPS',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Segment',
            name: 'segment',
            description: 'Defines the custom segment you wish to filter your reports to',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Segment Filter',
            name: 'segmentFilter',
            description: 'Segment string saved with the report (pre-filters the data)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Segment Name',
            name: 'segmentName',
            description: 'Name of the segment',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Setting Values',
            name: 'settingValues',
            description: 'Additional site settings (JSON or key=value list)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Show All Goal Specific Metrics',
            name: 'showAllGoalSpecificMetrics',
            description: 'Whether to include all goal-specific metrics (e.g., order metrics) when set',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Show Columns',
            name: 'showColumns',
            description: 'Array of column names to include in counters',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Show Goal Metrics For Goal',
            name: 'showGoalMetricsForGoal',
            description: 'Whether to show goal metrics for the goal',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Show Legend',
            name: 'showLegend',
            description: 'Whether to display the legend',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Show Metadata',
            name: 'showMetadata',
            description: 'Whether to include additionnal metadata',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Show Raw Metrics',
            name: 'showRawMetrics',
            description: 'Whether to show raw metrics',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Show Subtable Reports',
            name: 'showSubtableReports',
            description: 'Whether to show subtable reports',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Show Timer',
            name: 'showTimer',
            description: 'Whether to show timer',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Site Name',
            name: 'siteName',
            description: 'Public name of the site',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Site Search',
            name: 'siteSearch',
            description: 'Whether to enable internal site search reports',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Site Types To Exclude',
            name: 'siteTypesToExclude',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Sites To Exclude',
            name: 'sitesToExclude',
            description: 'Site IDs to exclude',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Skip Category Metadata',
            name: 'skipCategoryMetadata',
            description: 'Whether to omit extra category and subcategory metadata from the response',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Slack Channel ID',
            name: 'slackChannelID',
            description: 'Slack channel ID where the notification will be sent',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Source ID Sites',
            name: 'sourceIdSites',
            description: 'Comma-separated list (or array) of source site IDs to aggregate',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Starred',
            name: 'starred',
            description: 'Whether the annotation is marked as starred (important) in the system',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Start Date',
            name: 'startDate',
            description: 'The start date of the element',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Status',
            name: 'status',
            description: 'The status of the element',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Statuses',
            name: 'statuses',
            description: 'The status of the element',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Step',
            name: 'step',
            description: 'Optional step name/position to restrict entries/exits to a single step',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Step Position',
            name: 'stepPosition',
            description: 'Position (index) of the funnel step to retrieve a subtable for',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Steps',
            name: 'steps',
            description: 'Array describing funnel steps (match rules, order, etc.)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Sub Period N',
            name: 'subPeriodN',
            description: 'Defines a sub-period number',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Subcategory ID',
            name: 'subcategoryId',
            description: 'Subcategory grouping for the report',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Subcategory Report IDs',
            name: 'subCategoryReportIds',
            description: 'Array of report IDs to attach as sub-reports to this report (used by some types)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Success Metric',
            name: 'successMetric',
            description: 'Metric used to measure the success of the A/B experiment',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Success Metrics',
            name: 'successMetrics',
            description: 'A list of metrics used to measure the success of the A/B experiment',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Text Color',
            name: 'textColor',
            description: 'Hex color for text (e.g. 222222)',
            type: 'color',
            default: ''
          },
          {
            displayName: 'Timezone',
            name: 'timezone',
            description: 'Time zone for the roll-up site (e.g. UTC, Europe/Paris)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Track No Script',
            name: 'trackNoScript',
            description: 'Whether to add a noscript image tracker fallback',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Type',
            name: 'type',
            description: 'The type of the element',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Type Referrer',
            name: 'typeReferrer',
            description: 'Referrer type filter (e.g., search, website, campaign, direct, social, …)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Unset Link Visit Action Columns',
            name: 'unsetLinkVisitActionColumns',
            description: 'List of link visit action columns to remove or anonymize (array of column names)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Unset Visit Columns',
            name: 'unsetVisitColumns',
            description: 'Array of visit-level columns to remove from raw data',
            type: 'string',
            default: ''
          },
          {
            displayName: 'URL',
            name: 'url',
            description: 'The URL of the element',
            type: 'string',
            default: ''
          },
          {
            displayName: 'URLs',
            name: 'urls',
            description: 'One or more site URLs (array or comma-separated string)',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Use 12 Hour Clock',
            name: 'use12HourClock',
            description: 'Whether to use a 12-hour clock or a 24-hour clock',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'Use Event Value As Revenue',
            name: 'useEventValueAsRevenue',
            description: 'Whether to use the event value as conversion revenue when applicable',
            type: 'boolean',
            default: false
          },
          {
            displayName: 'User Email',
            name: 'userEmail',
            description: 'Email to look up a user by',
            type: 'string',
            default: ''
          },
          {
            displayName: 'User Login',
            name: 'userLogin',
            description: 'Login (username) of the user to manage',
            type: 'string',
            default: ''
          },
          {
            displayName: 'User Logins',
            name: 'userLogins',
            description: 'List of usernames to fetch in batch',
            type: 'string',
            default: ''
          },
          {
            displayName: 'Variations',
            name: 'variations',
            description: 'A list or array of variations for the A/B test',
            type: 'string',
            default: ''
          },  
          {
            displayName: 'Verification Code',
            name: 'verificationCode',
            description: 'One-time code sent to the phone number for verification',
            type: 'string',
            default: ''
          },  
          {
            displayName: 'Visitor Custom Variables',
            name: 'visitorCustomVariables',
            description: 'Array of custom visitor variables to embed in the tag',
            type: 'string',
            default: ''
          },  
          {
            displayName: 'Visitor ID',
            name: 'visitorId',
            description: '16-char hex visitor ID to fetch a profilet',
            type: 'string',
            default: ''
          },  
          {
            displayName: 'Visits',
            name: 'visits',
            description: 'One or more visit identifiers to act on (delete/export)',
            type: 'string',
            default: ''
          },          
          {
            displayName: 'Width',
            name: 'width',
            description: 'Image width in pixels',
            type: 'string',
            default: ''
          },          
          {
            displayName: 'Workspace ID',
            name: 'workspaceId',
            description: 'Identifier for a specific workspace in Google Tag Manager',
            type: 'string',
            default: ''
          }
        ]
      },
      {
        displayName: 'Request Body',
        name: 'requestBody',
        type: 'json',
	      default: '{}',
        displayOptions:{ show:{ operation:['abTestingAddExperimentPost', 'abTestingArchiveExperimentPost', 'abTestingDeleteExperimentPost', 'abTestingFinishExperimentPost', 'abTestingStartExperimentPost', 'abTestingUpdateExperimentPost', 'advertisingConversionExportAddPost', 'advertisingConversionExportRegenerateAccessTokenPost', 'advertisingConversionExportUpdatePost', 'annotationAddPost', 'annotationSavePost', 'connectAccountCreateMatomoTagPost', 'crashMergeCrashesPost', 'crashSearchCrashMessagesForMergePost', 'crashSetIgnoreCrashPost', 'crashUnmergeCrashGroupPost', 'customAlertAddPost', 'customAlertEditPost', 'customDimensionConfigureExistingPost', 'customDimensionConfigureNewPost', 'customReportAddPost', 'customReportDuplicatePost', 'customReportPausePost', 'customReportResumePost', 'customReportUpdatePost', 'dashboardCopyToUserPost', 'dashboardCreateForUserPost', 'dashboardRemovePost', 'dashboardResetLayoutPost', 'feedbackSendForFeaturePost', 'feedbackSendForSurveyPost', 'feedbackUpdateReminderDatePost', 'formAddPost', 'formArchivePost', 'formUpdatePost', 'formUpdateFieldDisplayNamePost', 'funnelSaveNonGoalFunnelPost', 'funnelSetGoalFunnelPost', 'funnelTestUrlMatchesStepsPost', 'goalAddPost', 'goalUpdatePost', 'heatmapSessionRecordingAddHeatmaPost', 'heatmapSessionRecordingAddSessionRecordingPost', 'heatmapSessionRecordingDuplicateHeatmapPost', 'heatmapSessionRecordingEndHeatmapPost', 'heatmapSessionRecordingEndSessionRecordingPost', 'heatmapSessionRecordingPauseHeatmapPost', 'heatmapSessionRecordingPauseSessionRecordingPost', 'heatmapSessionRecordingResumeHeatmapPost', 'heatmapSessionRecordingResumeSessionRecordingPost', 'heatmapSessionRecordingTestUrlMatchPagesPost', 'heatmapSessionRecordingUpdateHeatmapPost', 'heatmapSessionRecordingUpdateSessionRecordingPost', 'languagesManagerSet12HourClockForUserPost',  'languagesManagerSetLanguageForUserPost', 'languagesManagerUses12HourClockForUserPost', 'loginUnblockBruteForceIPsPost', 'mobileMessagingAddPhoneNumberPost', 'mobileMessagingAreSmsApiCredentialsProvidedPost', 'mobileMessagingRemovePhoneNumberPost', 'mobileMessagingResendVerificationCodePost', 'mobileMessagingSetDelegatedManagementPost', 'mobileMessagingSetSmsApiCredentialPost', 'mobileMessagingValidatePhoneNumberPost', 'multiChannelConversionAttributionSetGoalAttributionPost', 'privacyManagerAnonymizeSomeRawDataPost', 'privacyManagerExportDataSubjectsPost', 'privacyManagerFindDataSubjectsPost', 'rollUpReportingAddRollUpPost', 'rollUpReportingUpdateRollUpPost', 'scheduledReportAddReportPost', 'scheduledReportGenerateReportPost', 'scheduledReportSendReportPost', 'scheduledReportUpdateReportPost', 'segmentEditorAddSegmentPost', 'segmentEditorUpdateSegmentPost', 'sitesManagerAddSitePost', 'sitesManagerAddSiteAliasUrlsPost', 'sitesManagerRenameGroupPost', 'sitesManagerSetDefaultCurrencyPost', 'sitesManagerSetDefaultTimezonePost', 'sitesManagerSetGlobalExcludedIpsPost', 'sitesManagerSetGlobalExcludedReferrersPost', 'sitesManagerSetGlobalExcludedUserAgentsPost', 'sitesManagerSetGlobalQueryParamExclusionPost', 'sitesManagerSetGlobalSearchParametersPost', 'sitesManagerSetKeepUrlFragmentsGlobalPost', 'sitesManagerSetSiteAliasUrlsPost', 'sitesManagerUpdateSitePost', 'tagManagerAddContainerPost', 'tagManagerAddContainerTagPost', 'tagManagerAddContainerTriggerPost', 'tagManagerAddContainerVariablePost', 'tagManagerChangeDebugUrlPost', 'tagManagerCreateContainerVersionPost', 'tagManagerCreateDefaultContainerForSitePost', 'tagManagerDisablePreviewModePost', 'tagManagerEnablePreviewModePost', 'tagManagerExportContainerVersionPost', 'tagManagerImportContainerVersionPost', 'tagManagerPauseContainerTagPost', 'tagManagerPublishContainerVersionPost', 'tagManagerResumeContainerTagPost', 'tagManagerUpdateContainerPost', 'tagManagerUpdateContainerTagPost', 'tagManagerUpdateContainerTriggerPost', 'tagManagerUpdateContainerVariablePost', 'tagManagerUpdateContainerVersionPost', 'tourSkipChallengePost', 'twoFactorAuthResetTwoFactorAuthPost', 'userCountrySetLocationProviderPost'] } }
     }
		]
	};

	async execute(this: IExecuteFunctions) {
		const items = this.getInputData();
		const returnData = [];

		const credentials = await this.getCredentials('matomoApi');  
    const { domain, authToken } = credentials as { domain: string, authToken: string };
    if (!domain || !authToken) { throw new ApplicationError('Missing Domain or Auth Token.'); }
		
		// Traitement des opérations
		for (let i = 0; i < items.length; i++) {
			try {		        		
        		
       	const operation = this.getNodeParameter('operation', i, '') as string;		
        const resource = this.getNodeParameter('resource', i, '') as string;		
        const queryParameters = this.getNodeParameter('queryParameters', i, {}) as Record<string, string | number | boolean>;
        const requestBody = this.getNodeParameter('requestBody', i, '') as string;
        
        let url = `${domain}?token_auth=${authToken}&module=API`;
      
        const queryParams = new URLSearchParams();
        Object.entries(queryParameters).forEach(([key, value]) => {
          if (value !== ''){
            if (value === false || value === true) {
              value = +value;
            }
            queryParams.append(decodeURIComponent(key), String(value));
          } 
        });
        
        const queryString = queryParams.toString() ? `&${queryParams.toString()}` : '';
				
				switch (resource) {
          case 'abTesting':
            switch (operation) {
              case 'abTestingMetricsOverviewGet':
                url += `&method=AbTesting.getMetricsOverview&idSite${queryString}`;
                break;
              case 'abTestingMetricDetailsGet':
                url += `&method=AbTesting.getMetricDetails&idSite${queryString}`;
                break;
              case 'abTestingAddExperimentPost':
                url += `&method=AbTesting.addExperiment${queryString}`;
                break;
              case 'abTestingUpdateExperimentPost':
                url += `&method=AbTesting.updateExperiment${queryString}`;
                break;
              case 'abTestingStartExperimentPost':
                url += `&method=AbTesting.startExperiment${queryString}`;
                break;
              case 'abTestingFinishExperimentPost':
                url += `&method=AbTesting.finishExperiment${queryString}`;
                break;
              case 'abTestingArchiveExperimentPost':
                url += `&method=AbTesting.archiveExperiment${queryString}`;
                break;
              case 'abTestingJSIncludeTemplateGet':
                url += `&method=AbTesting.getJsIncludeTemplate${queryString}`;
                break;
              case 'abTestingJSExperimentTemplateGet':
                url += `&method=AbTesting.getJsExperimentTemplate${queryString}`;
                break;
              case 'abTestingAllExperimentsGet':
                url += `&method=AbTesting.getAllExperiments${queryString}`;
                break;
              case 'abTestingActiveExperimentsGet':
                url += `&method=AbTesting.getActiveExperiments${queryString}`;
                break;
              case 'abTestingExperimentsByStatusesGet':
                url += `&method=AbTesting.getExperimentsByStatuses${queryString}`;
                break;
              case 'abTestingExperimentGet':
                url += `&method=AbTesting.getExperiment${queryString}`;
                break;
              case 'abTestingDeleteExperimentPost':
                url += `&method=AbTesting.deleteExperiment${queryString}`;
                break;
              case 'abTestingAvailableStatusesGet':
                url += `&method=AbTesting.getAvailableStatuses${queryString}`;
                break;
              case 'abTestingAvailableSuccessMetricsGet':
                url += `&method=AbTesting.getAvailableSuccessMetrics${queryString}`;
                break;
              case 'abTestingAvailableTargetAttributesGet':
                url += `&method=AbTesting.getAvailableTargetAttributes${queryString}`;
                break;
              case 'abTestingExperimentsWithReportsGet':
                url += `&method=AbTesting.getExperimentsWithReports${queryString}`;
                break;
            }
            break;
          case 'action':
            switch (operation) {
              case 'actionGet':
                url += `&method=Actions.get${queryString}`;
                break;
              case 'actionDownloadGet':
                url += `&method=Actions.getDownload${queryString}`;
                break;
              case 'actionDownloadsGet':
                url += `&method=Actions.getDownloads${queryString}`;
                break;
              case 'actionEntryPageTitlesGet':
                url += `&method=Actions.getEntryPageTitles${queryString}`;
                break;
              case 'actionEntryPageUrlsGet':
                url += `&method=Actions.getEntryPageUrls${queryString}`;
                break;
              case 'actionExitPageTitlesGet':
                url += `&method=Actions.getExitPageTitles${queryString}`;
                break;
              case 'actionExitPageUrlsGet':
                url += `&method=Actions.getExitPageUrls${queryString}`;
                break;
              case 'actionOutlinkGet':
                url += `&method=Actions.getOutlink${queryString}`;
                break;
              case 'actionOutlinksGet':
                url += `&method=Actions.getOutlinks${queryString}`;
                break;
              case 'actionPageTitleGet':
                url += `&method=Actions.getPageTitle${queryString}`;
                break;
              case 'actionPageTitlesGet':
                url += `&method=Actions.getPageTitles${queryString}`;
                break;
              case 'actionPageTitlesFollowingSiteSearchGet':
                url += `&method=Actions.getPageTitlesFollowingSiteSearch${queryString}`;
                break;
              case 'actionPageUrlGet':
                url += `&method=Actions.getPageUrl${queryString}`;
                break;
              case 'actionPageUrlsGet':
                url += `&method=Actions.getPageUrls${queryString}`;
                break;
              case 'actionPageUrlsFollowingSiteSearchGet':
                url += `&method=Actions.getPageUrlsFollowingSiteSearch${queryString}`;
                break;
              case 'actionSiteSearchCategoriesGet':
                url += `&method=Actions.getSiteSearchCategories${queryString}`;
                break;
              case 'actionSiteSearchKeywordsGet':
                url += `&method=Actions.getSiteSearchKeywords${queryString}`;
                break;
              case 'actionSiteSearchNoResultKeywordsGet':
                url += `&method=Actions.getSiteSearchNoResultKeywords${queryString}`;
                break;
            }
            break;
          case 'activityLog':
            switch (operation) {
              case 'activityLogAllActivityTypesGet':
                url += `&method=ActivityLog.getAllActivityTypes${queryString}`;
                break;
              case 'activityLogEntriesGet':
                url += `&method=ActivityLog.getEntries${queryString}`;
                break;
              case 'activityLogEntryCountGet':
                url += `&method=ActivityLog.getEntryCount${queryString}`;
                break;
            }
            break;
          case 'advertisingConversionExport':
            switch (operation) {
              case 'advertisingConversionExportAddPost':
                url += `&method=AdvertisingConversionExport.addConversionExport${queryString}`;
                break;
              case 'advertisingConversionExportDelete':
                url += `&method=AdvertisingConversionExport.deleteConversionExport${queryString}`;
                break;
              case 'advertisingConversionExportGet':
                url += `&method=AdvertisingConversionExport.getConversionExport${queryString}`;
                break;
              case 'advertisingConversionExportListGet':
                url += `&method=AdvertisingConversionExport.getConversionExports${queryString}`;
                break;
              case 'advertisingConversionExportRegenerateAccessTokenPost':
                url += `&method=AdvertisingConversionExport.regenerateAccessToken${queryString}`;
                break;
              case 'advertisingConversionExportUpdatePost':
                url += `&method=AdvertisingConversionExport.updateConversionExport${queryString}`;
                break;
            }
            break;
          case 'annotation':
            switch (operation) {
              case 'annotationAddPost':
                url += `&method=Annotations.add${queryString}`;
                break;
              case 'annotationAllDelete':
                url += `&method=Annotations.deleteAll${queryString}`;
                break;
              case 'annotationDelete':
                url += `&method=Annotations.delete${queryString}`;
                break;
              case 'annotationGet':
                url += `&method=Annotations.get${queryString}`;
                break;
              case 'annotationAllGet':
                url += `&method=Annotations.getAll${queryString}`;
                break;
              case 'annotationCountForDatesGet':
                url += `&method=Annotations.getAnnotationCountForDates${queryString}`;
                break;
              case 'annotationSavePost':
                url += `&method=Annotations.save${queryString}`;
                break;
            }
            break;
          case 'api':			          
            switch (operation) {
              case 'apiGenericAPIReportGet':    
                url += `&method=API.get${queryString}`;
                break;
              case 'apiGlossaryMetricsGet':    
                url += `&method=API.getGlossaryMetrics${queryString}`;
                break;
              case 'apiGlossaryReportsGet':    
                url += `&method=API.getGlossaryReports${queryString}`;
                break;
              case 'apiMatomoIPFromHeaderGet':      
                url += `&method=API.getIpFromHeader${queryString}`;
                break;
              case 'apiMatomoVersionGet':      
                url += `&method=API.getMatomoVersion${queryString}`;
                break;
              case 'apiMetadataGet':      
                url += `&method=API.getMetadata${queryString}`;
                break;
              case 'apiPagesComparisonsDisabledForGet':      
                url += `&method=API.getPagesComparisonsDisabledFor${queryString}`;
                break;
              case 'apiPHPVersionGet':      
                url += `&method=API.getPhpVersion${queryString}`;
                break;
              case 'apiPluginActivationGet':     
                url += `&method=API.isPluginActivated${queryString}`;
                break;
              case 'apiProcessedReportGet':    
                url += `&method=API.getProcessedReport${queryString}`;
                break;
              case 'apiReportMetadataGet':     
                url += `&method=API.getReportMetadata${queryString}`;
                break;
              case 'apiReportPagesMetadataGet':     
                url += `&method=API.getReportPagesMetadata${queryString}`;
                break;
              case 'apiRowEvolutionGet':
                url += `&method=API.getRowEvolution${queryString}`;
                break;
              case 'apiSegmentsMetadataGet':    
                url += `&method=API.getSegmentsMetadata${queryString}`;
                break;
              case 'apiSettingsGet':      
                url += `&method=API.getSettings${queryString}`;
                break;
              case 'apiSuggestedValuesForSegmentGet':      
                url += `&method=API.getSuggestedValuesForSegment ${queryString}`;
                break;
              case 'apiWidgetMetadataGet':      
                url += `&method=API.getWidgetMetadata${queryString}`;
                break;
            }
						break;	
          case 'connectAccount':
            switch (operation) {
              case 'connectAccountGTMContainersListGet':
                url += `&method=ConnectAccounts.getGtmContainersList${queryString}`;
                break;
              case 'connectAccountGTMWorkspaceListGet':
                url += `&method=ConnectAccounts.getGtmWorkspaceList${queryString}`;
                break;
              case 'connectAccountCreateMatomoTagPost':
                url += `&method=ConnectAccounts.createMatomoTag${queryString}`;
                break;
            }
            break;
          case 'content':
            switch (operation) {
              case 'contentContentNamesGet':
                url += `&method=Contents.getContentNames${queryString}`;
                break;
              case 'contentContentPiecesGet':
                url += `&method=Contents.getContentPieces${queryString}`;
                break;
            }
            break;
          case 'coreAdminHome':
            switch (operation) {
              case 'coreAdminHomeAllTrackingFailuresDelete':
                url += `&method=CoreAdminHome.deleteAllTrackingFailures${queryString}`;
                break;
              case 'coreAdminHomeTrackingFailureDelete':
                url += `&method=CoreAdminHome.deleteTrackingFailure${queryString}`;
                break;
              case 'coreAdminHomeTrackingFailuresGet':
                url += `&method=CoreAdminHome.getTrackingFailures${queryString}`;
                break;
            }
            break;
          case 'crash':
            switch (operation) {
              case 'crashAllCrashMessagesGet':
                url += `&method=CrashAnalytics.getAllCrashMessages${queryString}`;
                break;
              case 'crashAllCrashesGet':
                url += `&method=CrashAnalytics.getAllCrashes${queryString}`;
                break;
              case 'crashCrashDataGet':
                url += `&method=CrashAnalytics.get${queryString}`;
                break;
              case 'crashCrashGroupsGet':
                url += `&method=CrashAnalytics.getCrashGroups${queryString}`;
                break;
              case 'crashCrashMessagesGet':
                url += `&method=CrashAnalytics.getCrashMessages${queryString}`;
                break;
              case 'crashCrashSummaryGet':
                url += `&method=CrashAnalytics.getCrashSummary${queryString}`;
                break;
              case 'crashCrashTypesGet':
                url += `&method=CrashAnalytics.getCrashTypes${queryString}`;
                break;
              case 'crashCrashVisitContextGet':
                url += `&method=CrashAnalytics.getCrashVisitContext${queryString}`;
                break;
              case 'crashCrashesByCategoryGet':
                url += `&method=CrashAnalytics.getCrashesByCategory${queryString}`;
                break;
              case 'crashCrashesByFirstPartyGet':
                url += `&method=CrashAnalytics.getCrashesByFirstParty${queryString}`;
                break;
              case 'crashCrashesByPageTitleGet':
                url += `&method=CrashAnalytics.getCrashesByPageTitle${queryString}`;
                break;
              case 'crashCrashesByPageUrlGet':
                url += `&method=CrashAnalytics.getCrashesByPageUrl${queryString}`;
                break;
              case 'crashCrashesBySourceGet':
                url += `&method=CrashAnalytics.getCrashesBySource${queryString}`;
                break;
              case 'crashCrashesByThirdPartyGet':
                url += `&method=CrashAnalytics.getCrashesByThirdParty${queryString}`;
                break;
              case 'crashCrashesForCategoryGet':
                url += `&method=CrashAnalytics.getCrashesForCategory${queryString}`;
                break;
              case 'crashCrashesForPageTitleGet':
                url += `&method=CrashAnalytics.getCrashesForPageTitle${queryString}`;
                break;
              case 'crashCrashesForPageUrlGet':
                url += `&method=CrashAnalytics.getCrashesForPageUrl${queryString}`;
                break;
              case 'crashCrashesForSourceGet':
                url += `&method=CrashAnalytics.getCrashesForSource${queryString}`;
                break;
              case 'crashDisappearedCrashesGet':
                url += `&method=CrashAnalytics.getDisappearedCrashes${queryString}`;
                break;
              case 'crashIgnoredCrashesGet':
                url += `&method=CrashAnalytics.getIgnoredCrashes${queryString}`;
                break;
              case 'crashLastCrashesOverviewGet':
                url += `&method=CrashAnalytics.getLastCrashesOverview${queryString}`;
                break;
              case 'crashLastDisappearedCrashesGet':
                url += `&method=CrashAnalytics.getLastDisappearedCrashes${queryString}`;
                break;
              case 'crashLastNewCrashesGet':
                url += `&method=CrashAnalytics.getLastNewCrashes${queryString}`;
                break;
              case 'crashLastReappearedCrashesGet':
                url += `&method=CrashAnalytics.getLastReappearedCrashes${queryString}`;
                break;
              case 'crashLastTopCrashesGet':
                url += `&method=CrashAnalytics.getLastTopCrashes${queryString}`;
                break;
              case 'crashNewCrashesGet':
                url += `&method=CrashAnalytics.getNewCrashes${queryString}`;
                break;
              case 'crashReappearedCrashesGet':
                url += `&method=CrashAnalytics.getReappearedCrashes${queryString}`;
                break;
              case 'crashUnidentifiedCrashMessagesGet':
                url += `&method=CrashAnalytics.getUnidentifiedCrashMessages${queryString}`;
                break;
              case 'crashMergeCrashesPost':
                url += `&method=CrashAnalytics.mergeCrashes${queryString}`;
                break;
              case 'crashSearchCrashMessagesForMergePost':
                url += `&method=CrashAnalytics.searchCrashMessagesForMerge${queryString}`;
                break;
              case 'crashSetIgnoreCrashPost':
                url += `&method=CrashAnalytics.setIgnoreCrash${queryString}`;
                break;
              case 'crashUnmergeCrashGroupPost':
                url += `&method=CrashAnalytics.unmergeCrashGroup${queryString}`;
                break;
            }
            break;
          case 'customAlert':
            switch (operation) {
              case 'customAlertAddPost':
                url += `&method=CustomAlerts.addAlert${queryString}`;
                break;
              case 'customAlertDelete':
                url += `&method=CustomAlerts.deleteAlert${queryString}`;
                break;
              case 'customAlertEditPost':
                url += `&method=CustomAlerts.editAlert${queryString}`;
                break;
              case 'customAlertGet':
                url += `&method=CustomAlerts.getAlert${queryString}`;
                break;
              case 'customAlertListGet':
                url += `&method=CustomAlerts.getAlerts${queryString}`;
                break;
              case 'customAlertTriggeredGet':
                url += `&method=CustomAlerts.getTriggeredAlerts${queryString}`;
                break;
              case 'customAlertValuesForPastGet':
                url += `&method=CustomAlerts.getValuesForAlertInPast${queryString}`;
                break;
            }
            break; 
          case 'customDimension': 
            switch (operation) {
              case 'customDimensionGetGet':
                url += `&method=CustomDimensions.getCustomDimension${queryString}`;
                break;
              case 'customDimensionConfigureNewPost':
                url += `&method=CustomDimensions.configureNewCustomDimension${queryString}`;
                break;
              case 'customDimensionConfigureExistingPost':
                url += `&method=CustomDimensions.configureExistingCustomDimension${queryString}`;
                break;
              case 'customDimensionConfiguredGet':
                url += `&method=CustomDimensions.getConfiguredCustomDimensions${queryString}`;
                break;
              case 'customDimensionConfiguredScopeGet':
                url += `&method=CustomDimensions.getConfiguredCustomDimensionsHavingScope${queryString}`;
                break;
              case 'customDimensionAvailableScopesGet':
                url += `&method=CustomDimensions.getAvailableScopes${queryString}`;
                break;
              case 'customDimensionAvailableExtractionGet':
                url += `&method=CustomDimensions.getAvailableExtractionDimensions${queryString}`;
                break;
            }
            break;  
          case 'customJsTracker': 
            switch (operation) {
              case 'customJsTrackerPluginTrackersGet':
                url += `&method=CustomJsTracker.doesIncludePluginTrackersAutomatically${queryString}`;
                break;
            }
            break;  
          case 'customReport':
            switch (operation) {
              case 'customReportAddPost':
                url += `&method=CustomReports.addCustomReport${queryString}`;
                break;
              case 'customReportDelete':
                url += `&method=CustomReports.deleteCustomReport${queryString}`;
                break;
              case 'customReportDuplicatePost':
                url += `&method=CustomReports.duplicateCustomReport${queryString}`;
                break;
              case 'customReportAvailableCategoriesGet':
                url += `&method=CustomReports.getAvailableCategories${queryString}`;
                break;
              case 'customReportAvailableDimensionsGet':
                url += `&method=CustomReports.getAvailableDimensions${queryString}`;
                break;
              case 'customReportAvailableMetricsGet':
                url += `&method=CustomReports.getAvailableMetrics${queryString}`;
                break;
              case 'customReportAvailableReportTypesGet':
                url += `&method=CustomReports.getAvailableReportTypes${queryString}`;
                break;
              case 'customReportConfiguredReportGet':
                url += `&method=CustomReports.getConfiguredReport${queryString}`;
                break;
              case 'customReportConfiguredReportsGet':
                url += `&method=CustomReports.getConfiguredReports${queryString}`;
                break;
              case 'customReportGet':
                url += `&method=CustomReports.getCustomReport${queryString}`;
                break;
              case 'customReportPausePost':
                url += `&method=CustomReports.pauseCustomReport${queryString}`;
                break;
              case 'customReportResumePost':
                url += `&method=CustomReports.resumeCustomReport${queryString}`;
                break;
              case 'customReportUpdatePost':
                url += `&method=CustomReports.updateCustomReport${queryString}`;
                break;
            }
            break;
          case 'customVariable': 
            switch (operation) {
              case 'customVariableGet':
                url += `&method=CustomVariables.getCustomVariables${queryString}`;
                break;
              case 'customVariableValuesFromNameIdGet':
                url += `&method=CustomVariables.getCustomVariablesValuesFromNameId${queryString}`;
                break;
              case 'customVariableUsagesOfSlotsGet':
                url += `&method=CustomVariables.getUsagesOfSlots${queryString}`;
                break;
            }
            break;
          case 'dashboard':
            switch (operation) {
              case 'dashboardCopyToUserPost':
                url += `&method=Dashboard.copyDashboardToUser${queryString}`;
                break;
              case 'dashboardCreateForUserPost':
                url += `&method=Dashboard.createNewDashboardForUser${queryString}`;
                break;
              case 'dashboardGet':
                url += `&method=Dashboard.getDashboards${queryString}`;
                break;
              case 'dashboardRemovePost':
                url += `&method=Dashboard.removeDashboard${queryString}`;
                break;
              case 'dashboardResetLayoutPost':
                url += `&method=Dashboard.resetDashboardLayout${queryString}`;
                break;
            }
            break;
          case 'devicePlugin':
            switch (operation) {
              case 'devicePluginGet':
                url += `&method=DevicePlugins.getPlugin${queryString}`;
                break;
            }
            break;
          case 'devicesDetection':
            switch (operation) {
              case 'devicesDetectionBrandGet':
                url += `&method=DevicesDetection.getBrand${queryString}`;
                break;
              case 'devicesDetectionBrowserEnginesGet':
                url += `&method=DevicesDetection.getBrowserEngines${queryString}`;
                break;
              case 'devicesDetectionBrowserVersionsGet':
                url += `&method=DevicesDetection.getBrowserVersions${queryString}`;
                break;
              case 'devicesDetectionBrowsersGet':
                url += `&method=DevicesDetection.getBrowsers${queryString}`;
                break;
              case 'devicesDetectionModelGet':
                url += `&method=DevicesDetection.getModel${queryString}`;
                break;
              case 'devicesDetectionOsFamiliesGet':
                url += `&method=DevicesDetection.getOsFamilies${queryString}`;
                break;
              case 'devicesDetectionOsVersionsGet':
                url += `&method=DevicesDetection.getOsVersions${queryString}`;
                break;
              case 'devicesDetectionTypeGet':
                url += `&method=DevicesDetection.getType${queryString}`;
                break;
            }
            break;
          case 'event':
            switch (operation) {
              case 'eventActionGet':
                url += `&method=Events.getAction${queryString}`;
                break;
              case 'eventActionFromCategoryIdGet':
                url += `&method=Events.getActionFromCategoryId${queryString}`;
                break;
              case 'eventActionFromNameIdGet':
                url += `&method=Events.getActionFromNameId${queryString}`;
                break;
              case 'eventCategoryGet':
                url += `&method=Events.getCategory${queryString}`;
                break;
              case 'eventCategoryFromActionIdGet':
                url += `&method=Events.getCategoryFromActionId${queryString}`;
                break;
              case 'eventCategoryFromNameIdGet':
                url += `&method=Events.getCategoryFromNameId${queryString}`;
                break;
              case 'eventNameGet':
                url += `&method=Events.getName${queryString}`;
                break;
              case 'eventNameFromActionIdGet':
                url += `&method=Events.getNameFromActionId${queryString}`;
                break;
              case 'eventNameFromCategoryIdGet':
                url += `&method=Events.getNameFromCategoryId${queryString}`;
                break;
            }
            break;
          case 'feedback':
            switch (operation) {
              case 'feedbackSendForFeaturePost':
                url += `&method=Feedback.sendFeedbackForFeature${queryString}`;
                break;
              case 'feedbackSendForSurveyPost':
                url += `&method=Feedback.sendFeedbackForSurvey${queryString}`;
                break;
              case 'feedbackUpdateReminderDatePost':
                url += `&method=Feedback.updateFeedbackReminderDate${queryString}`;
                break;
            }
            break;
          case 'form':
            switch (operation) {
              case 'formAddPost':
                url += `&method=FormAnalytics.addForm${queryString}`;
                break;
              case 'formArchivePost':
                url += `&method=FormAnalytics.archiveForm${queryString}`;
                break;
              case 'formDelete':
                url += `&method=FormAnalytics.deleteForm${queryString}`;
                break;
              case 'formGet':
                url += `&method=FormAnalytics.get${queryString}`;
                break;
              case 'formAllGoalsGet':
                url += `&method=FormAnalytics.getAllGoals${queryString}`;
                break;
              case 'formAutoCreationSettingsGet':
                url += `&method=FormAnalytics.getAutoCreationSettings${queryString}`;
                break;
              case 'formAvailableConversionRuleOptionsGet':
                url += `&method=FormAnalytics.getAvailableConversionRuleOptions${queryString}`;
                break;
              case 'formAvailableFormRulesGet':
                url += `&method=FormAnalytics.getAvailableFormRules${queryString}`;
                break;
              case 'formAvailablePageRulesGet':
                url += `&method=FormAnalytics.getAvailablePageRules${queryString}`;
                break;
              case 'formAvailableStatusesGet':
                url += `&method=FormAnalytics.getAvailableStatuses${queryString}`;
                break;
              case 'formCountersGet':
                url += `&method=FormAnalytics.getCounters${queryString}`;
                break;
              case 'formCurrentMostPopularFormsGet':
                url += `&method=FormAnalytics.getCurrentMostPopularForms${queryString}`;
                break;
              case 'formDropOffFieldsGet':
                url += `&method=FormAnalytics.getDropOffFields${queryString}`;
                break;
              case 'formEntryFieldsGet':
                url += `&method=FormAnalytics.getEntryFields${queryString}`;
                break;
              case 'formFieldCorrectionsGet':
                url += `&method=FormAnalytics.getFieldCorrections${queryString}`;
                break;
              case 'formFieldSizeGet':
                url += `&method=FormAnalytics.getFieldSize${queryString}`;
                break;
              case 'formFieldTimingsGet':
                url += `&method=FormAnalytics.getFieldTimings${queryString}`;
                break;
              case 'formFormGet':
                url += `&method=FormAnalytics.getForm${queryString}`;
                break;
              case 'formFormsGet':
                url += `&method=FormAnalytics.getForms${queryString}`;
                break;
              case 'formFormsByStatusesGet':
                url += `&method=FormAnalytics.getFormsByStatuses${queryString}`;
                break;
              case 'formMostUsedFieldsGet':
                url += `&method=FormAnalytics.getMostUsedFields${queryString}`;
                break;
              case 'formPageUrlsGet':
                url += `&method=FormAnalytics.getPageUrls${queryString}`;
                break;
              case 'formUneededFieldsGet':
                url += `&method=FormAnalytics.getUneededFields${queryString}`;
                break;
              case 'formUpdatePost':
                url += `&method=FormAnalytics.updateForm${queryString}`;
                break;
              case 'formUpdateFieldDisplayNamePost':
                url += `&method=FormAnalytics.updateFormFieldDisplayName${queryString}`;
                break;
            }
            break;
          case 'funnel':
            switch (operation) {
              case 'funnelGoalFunnelDelete':
                url += `&method=Funnels.deleteGoalFunnel${queryString}`;
                break;
              case 'funnelNonGoalFunnelDelete':
                url += `&method=Funnels.deleteNonGoalFunnel${queryString}`;
                break;
              case 'funnelAllActivatedFunnelsForSiteGet':
                url += `&method=Funnels.getAllActivatedFunnelsForSite${queryString}`;
                break;
              case 'funnelAvailablePatternMatchesGet':
                url += `&method=Funnels.getAvailablePatternMatches${queryString}`;
                break;
              case 'funnelFunnelGet':
                url += `&method=Funnels.getFunnel${queryString}`;
                break;
              case 'funnelFunnelEntriesGet':
                url += `&method=Funnels.getFunnelEntries${queryString}`;
                break;
              case 'funnelFunnelExitsGet':
                url += `&method=Funnels.getFunnelExits${queryString}`;
                break;
              case 'funnelFunnelFlowGet':
                url += `&method=Funnels.getFunnelFlow${queryString}`;
                break;
              case 'funnelFunnelFlowTableGet':
                url += `&method=Funnels.getFunnelFlowTable${queryString}`;
                break;
              case 'funnelFunnelStepSubtableGet':
                url += `&method=Funnels.getFunnelStepSubtable${queryString}`;
                break;
              case 'funnelGoalFunnelGet':
                url += `&method=Funnels.getGoalFunnel${queryString}`;
                break;
              case 'funnelMetricsGet':
                url += `&method=Funnels.getMetrics${queryString}`;
                break;
              case 'funnelSalesFunnelForSiteGet':
                url += `&method=Funnels.getSalesFunnelForSite${queryString}`;
                break;
              case 'funnelHasAnyActivatedFunnelForSiteGet':
                url += `&method=Funnels.hasAnyActivatedFunnelForSite${queryString}`;
                break;
              case 'funnelSaveNonGoalFunnelPost':
                url += `&method=Funnels.saveNonGoalFunnel${queryString}`;
                break;
              case 'funnelSetGoalFunnelPost':
                url += `&method=Funnels.setGoalFunnel${queryString}`;
                break;
              case 'funnelTestUrlMatchesStepsPost':
                url += `&method=Funnels.testUrlMatchesSteps${queryString}`;
                break;
            }
            break;
          case 'goal':
            switch (operation) {
              case 'goalAddPost':
                url += `&method=Goals.addGoal${queryString}`;
                break;
              case 'goalDelete':
                url += `&method=Goals.deleteGoal${queryString}`;
                break;
              case 'goelMetricsGet':
                url += `&method=Goals.get${queryString}`;
                break;
              case 'goalDaysToConversionGet':
                url += `&method=Goals.getDaysToConversion${queryString}`;
                break;
              case 'goalGoalGet':
                url += `&method=Goals.getGoal${queryString}`;
                break;
              case 'goalGoalsGet':
                url += `&method=Goals.getGoals${queryString}`;
                break;
              case 'goalItemsCategoryGet':
                url += `&method=Goals.getItemsCategory${queryString}`;
                break;
              case 'goalItemsNameGet':
                url += `&method=Goals.getItemsName${queryString}`;
                break;
              case 'goalItemsSkuGet':
                url += `&method=Goals.getItemsSku${queryString}`;
                break;
              case 'goalVisitsUntilConversionGet':
                url += `&method=Goals.getVisitsUntilConversion${queryString}`;
                break;
              case 'goalUpdatePost':
                url += `&method=Goals.updateGoal${queryString}`;
                break;
            }
            break;
          case 'heatmapSessionRecording':
            switch (operation) {
              case 'heatmapSessionRecordingAddHeatmaPost':
                url += `&method=HeatmapSessionRecording.addHeatmap${queryString}`;
                break;
              case 'heatmapSessionRecordingAddSessionRecordingPost':
                url += `&method=HeatmapSessionRecording.addSessionRecording${queryString}`;
                break;
              case 'heatmapSessionRecordingHeatmapDelete':
                url += `&method=HeatmapSessionRecording.deleteHeatmap${queryString}`;
                break;
              case 'heatmapSessionRecordingHeatmapScreenshotDelete':
                url += `&method=HeatmapSessionRecording.deleteHeatmapScreenshot${queryString}`;
                break;
              case 'heatmapSessionRecordingRecordedPageviewDelete':
                url += `&method=HeatmapSessionRecording.deleteRecordedPageview${queryString}`;
                break;
              case 'heatmapSessionRecordingRecordedSessionDelete':
                url += `&method=HeatmapSessionRecording.deleteRecordedSession${queryString}`;
                break;
              case 'heatmapSessionRecordingSessionRecordingDelete':
                url += `&method=HeatmapSessionRecording.deleteSessionRecording${queryString}`;
                break;
              case 'heatmapSessionRecordingDuplicateHeatmapPost':
                url += `&method=HeatmapSessionRecording.duplicateHeatmap${queryString}`;
                break;
              case 'heatmapSessionRecordingEndHeatmapPost':
                url += `&method=HeatmapSessionRecording.endHeatmap${queryString}`;
                break;
              case 'heatmapSessionRecordingEndSessionRecordingPost':
                url += `&method=HeatmapSessionRecording.endSessionRecording${queryString}`;
                break;
              case 'heatmapSessionRecordingAvailableDeviceTypesGet':
                url += `&method=HeatmapSessionRecording.getAvailableDeviceTypes${queryString}`;
                break;
              case 'heatmapSessionRecordingAvailableHeatmapTypesGet':
                url += `&method=HeatmapSessionRecording.getAvailableHeatmapTypes${queryString}`;
                break;
              case 'heatmapSessionRecordingAvailableSessionRecordingSampleLimitsGet':
                url += `&method=HeatmapSessionRecording.getAvailableSessionRecordingSampleLimits${queryString}`;
                break;
              case 'heatmapSessionRecordingAvailableStatusesGet':
                url += `&method=HeatmapSessionRecording.getAvailableStatuses${queryString}`;
                break;
              case 'heatmapSessionRecordingAvailableTargetPageRulesGet':
                url += `&method=HeatmapSessionRecording.getAvailableTargetPageRules${queryString}`;
                break;
              case 'heatmapSessionRecordingEmbedSessionInfoGet':
                url += `&method=HeatmapSessionRecording.getEmbedSessionInfo${queryString}`;
                break;
              case 'heatmapSessionRecordingEventTypesGet':
                url += `&method=HeatmapSessionRecording.getEventTypes${queryString}`;
                break;
              case 'heatmapSessionRecordingHeatmapGet':
                url += `&method=HeatmapSessionRecording.getHeatmap${queryString}`;
                break;
              case 'heatmapSessionRecordingHeatmapsGet':
                url += `&method=HeatmapSessionRecording.getHeatmaps${queryString}`;
                break;
              case 'heatmapSessionRecordingRecordedHeatmapGet':
                url += `&method=HeatmapSessionRecording.getRecordedHeatmap${queryString}`;
                break;
              case 'heatmapSessionRecordingRecordedHeatmapMetadataGet':
                url += `&method=HeatmapSessionRecording.getRecordedHeatmapMetadata${queryString}`;
                break;
              case 'heatmapSessionRecordingRecordedSessionGet':
                url += `&method=HeatmapSessionRecording.getRecordedSession${queryString}`;
                break;
              case 'heatmapSessionRecordingRecordedSessionsGet':
                url += `&method=HeatmapSessionRecording.getRecordedSessions${queryString}`;
                break;
              case 'heatmapSessionRecordingSessionRecordingGet':
                url += `&method=HeatmapSessionRecording.getSessionRecording${queryString}`;
                break;
              case 'heatmapSessionRecordingSessionRecordingsGet':
                url += `&method=HeatmapSessionRecording.getSessionRecordings${queryString}`;
                break;
              case 'heatmapSessionRecordingPauseHeatmapPost':
                url += `&method=HeatmapSessionRecording.pauseHeatmap${queryString}`;
                break;
              case 'heatmapSessionRecordingPauseSessionRecordingPost':
                url += `&method=HeatmapSessionRecording.pauseSessionRecording${queryString}`;
                break;
              case 'heatmapSessionRecordingResumeHeatmapPost':
                url += `&method=HeatmapSessionRecording.resumeHeatmap${queryString}`;
                break;
              case 'heatmapSessionRecordingResumeSessionRecordingPost':
                url += `&method=HeatmapSessionRecording.resumeSessionRecording${queryString}`;
                break;
              case 'heatmapSessionRecordingTestUrlMatchPagesPost':
                url += `&method=HeatmapSessionRecording.testUrlMatchPages${queryString}`;
                break;
              case 'heatmapSessionRecordingUpdateHeatmapPost':
                url += `&method=HeatmapSessionRecording.updateHeatmap${queryString}`;
                break;
              case 'heatmapSessionRecordingUpdateSessionRecordingPost':
                url += `&method=HeatmapSessionRecording.updateSessionRecording${queryString}`;
                break;
            }
            break;
          case 'imageGraph':
            switch (operation) {
              case 'imageGraphStaticImageGraphGet':
                url += `&method=ImageGraph.get${queryString}`;
                break;
            }
            break;
          case 'insight':
            switch (operation) {
              case 'insightCanGenerateInsightsGet':
                url += `&method=Insights.canGenerateInsights${queryString}`;
                break;
              case 'insightInsightsGet':
                url += `&method=Insights.getInsights${queryString}`;
                break;
              case 'insightInsightsOverviewGet':
                url += `&method=Insights.getInsightsOverview${queryString}`;
                break;
              case 'insightMoversAndShakersGet':
                url += `&method=Insights.getMoversAndShakers${queryString}`;
                break;
              case 'insightMoversAndShakersOverviewGet':
                url += `&method=Insights.getMoversAndShakersOverview${queryString}`;
                break;
            }
            break;
          case 'languagesManager':
            switch (operation) {
              case 'languagesManagerAvailableLanguageNamesGet':
                url += `&method=LanguagesManager.getAvailableLanguageNames${queryString}`;
                break;
              case 'languagesManagerAvailableLanguagesGet':
                url += `&method=LanguagesManager.getAvailableLanguages${queryString}`;
                break;
              case 'languagesManagerAvailableLanguagesInfoGet':
                url += `&method=LanguagesManager.getAvailableLanguagesInfo${queryString}`;
                break;
              case 'languagesManagerLanguageForUserGet':
                url += `&method=LanguagesManager.getLanguageForUser${queryString}`;
                break;
              case 'languagesManagerTranslationsForLanguageGet':
                url += `&method=LanguagesManager.getTranslationsForLanguage${queryString}`;
                break;
              case 'languagesManagerIsLanguageAvailableGet':
                url += `&method=LanguagesManager.isLanguageAvailable${queryString}`;
                break;
              case 'languagesManagerSet12HourClockForUserPost':
                url += `&method=LanguagesManager.set12HourClockForUser${queryString}`;
                break;
              case 'languagesManagerSetLanguageForUserPost':
                url += `&method=LanguagesManager.setLanguageForUser${queryString}`;
                break;
              case 'languagesManagerUses12HourClockForUserPost':
                url += `&method=LanguagesManager.uses12HourClockForUser${queryString}`;
                break;
            }
            break;
          case 'live':
            switch (operation) {
              case 'liveCountersGet':
                url += `&method=Live.getCounters${queryString}`;
                break;
              case 'liveLastVisitsDetailsGet':
                url += `&method=Live.getLastVisitsDetails${queryString}`;
                break;
              case 'liveMostRecentVisitorIdGet':
                url += `&method=Live.getMostRecentVisitorId${queryString}`;
                break;
              case 'liveMostRecentVisitsDateTimeGet':
                url += `&method=Live.getMostRecentVisitsDateTime${queryString}`;
                break;
              case 'liveVisitorProfileGet':
                url += `&method=Live.getVisitorProfile${queryString}`;
                break;
              case 'liveIsVisitorProfileEnabledGet':
                url += `&method=Live.isVisitorProfileEnabled${queryString}`;
                break;
            }
            break;
          case 'login':
            switch (operation) {
              case 'loginUnblockBruteForceIPsPost':
                url += `&method=Login.unblockBruteForceIPs${queryString}`;
                break;
            }
            break;
          case 'marketingCampaignsReporting':
            switch (operation) {
              case 'marketingCampaignsReportingContentGet':
                url += `&method=MarketingCampaignsReporting.getContent${queryString}`;
                break;
              case 'marketingCampaignsReportingGroupGet':
                url += `&method=MarketingCampaignsReporting.getGroup${queryString}`;
                break;
              case 'marketingCampaignsReportingIdGet':
                url += `&method=MarketingCampaignsReporting.getId${queryString}`;
                break;
              case 'marketingCampaignsReportingKeywordGet':
                url += `&method=MarketingCampaignsReporting.getKeyword${queryString}`;
                break;
              case 'marketingCampaignsReportingKeywordContentFromNameIdGet':
                url += `&method=MarketingCampaignsReporting.getKeywordContentFromNameId${queryString}`;
                break;
              case 'marketingCampaignsReportingMediumGet':
                url += `&method=MarketingCampaignsReporting.getMedium${queryString}`;
                break;
              case 'marketingCampaignsReportingNameGet':
                url += `&method=MarketingCampaignsReporting.getName${queryString}`;
                break;
              case 'marketingCampaignsReportingNameFromSourceMediumIdGet':
                url += `&method=MarketingCampaignsReporting.getNameFromSourceMediumId${queryString}`;
                break;
              case 'marketingCampaignsReportingPlacementGet':
                url += `&method=MarketingCampaignsReporting.getPlacement${queryString}`;
                break;
              case 'marketingCampaignsReportingSourceGet':
                url += `&method=MarketingCampaignsReporting.getSource${queryString}`;
                break;
              case 'marketingCampaignsReportingSourceAndMediumGet':
                url += `&method=MarketingCampaignsReporting.getSourceMedium ${queryString}`;
                break;
            }
            break;
          case 'media':
            switch (operation) {
              case 'mediaAudioHoursGet':
                url += `&method=MediaAnalytics.getAudioHours${queryString}`;
                break;
              case 'mediaAudioResourcesGet':
                url += `&method=MediaAnalytics.getAudioResources${queryString}`;
                break;
              case 'mediaAudioTitlesGet':
                url += `&method=MediaAnalytics.getAudioTitles${queryString}`;
                break;
              case 'mediaCurrentMostPlaysGet':
                url += `&method=MediaAnalytics.getCurrentMostPlays${queryString}`;
                break;
              case 'mediaCurrentNumPlaysGet':
                url += `&method=MediaAnalytics.getCurrentNumPlays${queryString}`;
                break;
              case 'mediaCurrentSumTimeSpentGet':
                url += `&method=MediaAnalytics.getCurrentSumTimeSpent${queryString}`;
                break;
              case 'mediaGroupedAudioResourcesGet':
                url += `&method=MediaAnalytics.getGroupedAudioResources${queryString}`;
                break;
              case 'mediaGroupedVideoResourcesGet':
                url += `&method=MediaAnalytics.getGroupedVideoResources${queryString}`;
                break;
              case 'mediaAnalyticsGet':
                url += `&method=MediaAnalytics.get${queryString}`;
                break;
              case 'mediaPlayersGet':
                url += `&method=MediaAnalytics.getPlayers${queryString}`;
                break;
              case 'mediaVideoHoursGet':
                url += `&method=MediaAnalytics.getVideoHours${queryString}`;
                break;
              case 'mediaVideoResolutionsGet':
                url += `&method=MediaAnalytics.getVideoResolutions${queryString}`;
                break;
              case 'mediaVideoResourcesGet':
                url += `&method=MediaAnalytics.getVideoResources${queryString}`;
                break;
              case 'mediaVideoTitlesGet':
                url += `&method=MediaAnalytics.getVideoTitles${queryString}`;
                break;
              case 'mediaHasRecordsGet':
                url += `&method=MediaAnalytics.hasRecords${queryString}`;
                break;
            }
            break;
          case 'mobileMessaging':
            switch (operation) {
              case 'mobileMessagingAddPhoneNumberPost':
                url += `&method=MobileMessaging.addPhoneNumber${queryString}`;
                break;
              case 'mobileMessagingAreSmsApiCredentialsProvidedPost':
                url += `&method=MobileMessaging.areSMSAPICredentialProvided${queryString}`;
                break;
              case 'mobileMessagingSmsApiCredentialDelete':
                url += `&method=MobileMessaging.deleteSMSAPICredential${queryString}`;
                break;
              case 'mobileMessagingCreditLeftGet':
                url += `&method=MobileMessaging.getCreditLeft${queryString}`;
                break;
              case 'mobileMessagingDelegatedManagementGet':
                url += `&method=MobileMessaging.getDelegatedManagement${queryString}`;
                break;
              case 'mobileMessagingPhoneNumbersGet':
                url += `&method=MobileMessaging.getPhoneNumbers${queryString}`;
                break;
              case 'mobileMessagingSmsProviderGet':
                url += `&method=MobileMessaging.getSMSProvider${queryString}`;
                break;
              case 'mobileMessagingRemovePhoneNumberPost':
                url += `&method=MobileMessaging.removePhoneNumber${queryString}`;
                break;
              case 'mobileMessagingResendVerificationCodePost':
                url += `&method=MobileMessaging.resendVerificationCode${queryString}`;
                break;
              case 'mobileMessagingSetDelegatedManagementPost':
                url += `&method=MobileMessaging.setDelegatedManagement${queryString}`;
                break;
              case 'mobileMessagingSetSmsApiCredentialPost':
                url += `&method=MobileMessaging.setSMSAPICredential${queryString}`;
                break;
              case 'mobileMessagingValidatePhoneNumberPost':
                url += `&method=MobileMessaging.validatePhoneNumber${queryString}`;
                break;
            }
            break;
          case 'multiChannelConversionAttribution':
            switch (operation) {
              case 'multiChannelConversionAttributionAvailableCampaignDimensionCombinationsGet':
                url += `&method=MultiChannelConversionAttribution.getAvailableCampaignDimensionCombinations${queryString}`;
                break;
              case 'multiChannelConversionAttributionChannelAttributionGet':
                url += `&method=MultiChannelConversionAttribution.getChannelAttribution${queryString}`;
                break;
              case 'multiChannelConversionAttributionGoalAttributionGet':
                url += `&method=MultiChannelConversionAttribution.getGoalAttribution${queryString}`;
                break;
              case 'multiChannelConversionAttributionSiteAttributionGoalsGet':
                url += `&method=MultiChannelConversionAttribution.getSiteAttributionGoals${queryString}`;
                break;
              case 'multiChannelConversionAttributionSetGoalAttributionPost':
                url += `&method=MultiChannelConversionAttribution.setGoalAttribution${queryString}`;
                break;
            }
            break;
          case 'multiSite':
            switch (operation) {
              case 'multiSiteAllGet':
                url += `&method=MultiSites.getAll${queryString}`;
                break;
              case 'multiSiteAllWithGroupsGet':
                url += `&method=MultiSites.getAllWithGroups${queryString}`;
                break;
              case 'multiSiteOneGet':
                url += `&method=MultiSites.getOne${queryString}`;
                break;
            }
            break;
          case 'overlay':
            switch (operation) {
              case 'overlayFollowingPagesGet':
                url += `&method=Overlay.getFollowingPages${queryString}`;
                break;
              case 'overlayTranslationsGet':
                url += `&method=Overlay.getTranslations${queryString}`;
                break;
            }
            break;
          case 'pagePerformance':
            switch (operation) {
              case 'pagePerformanceGet':
                url += `&method=PagePerformance.get${queryString}`;
                break;
            }
            break;
          case 'privacyManager':
            switch (operation) {
              case 'privacyManagerAnonymizeSomeRawDataPost':
                url += `&method=PrivacyManager.anonymizeSomeRawData${queryString}`;
                break;
              case 'privacyManagerDataSubjectsDelete':
                url += `&method=PrivacyManager.deleteDataSubjects${queryString}`;
                break;
              case 'privacyManagerExportDataSubjectsPost':
                url += `&method=PrivacyManager.exportDataSubjects${queryString}`;
                break;
              case 'privacyManagerFindDataSubjectsPost':
                url += `&method=PrivacyManager.findDataSubjects${queryString}`;
                break;
              case 'privacyManagerAvailableVisitColumnsToAnonymizeGet':
                url += `&method=PrivacyManager.getAvailableVisitColumnsToAnonymize${queryString}`;
                break;
              case 'privacyManagerAvailableLinkVisitActionColumnsToAnonymizeGet':
                url += `&method=PrivacyManager.getAvailableLinkVisitActionColumnsToAnonymize${queryString}`;
                break;
            }
            break;
          case 'referrer':
            switch (operation) {
              case 'referrerGet':
                url += `&method=Referrers.get${queryString}`;
                break;
              case 'referrerTypeGet':
                url += `&method=Referrers.getReferrerType${queryString}`;
                break;
              case 'referrerAllGet':
                url += `&method=Referrers.getAll${queryString}`;
                break;
              case 'referrerKeywordsGet':
                url += `&method=Referrers.getKeywords${queryString}`;
                break;
              case 'referrerSearchEnginesFromKeywordIdGet':
                url += `&method=Referrers.getSearchEnginesFromKeywordId${queryString}`;
                break;
              case 'referrerSearchEnginesGet':
                url += `&method=Referrers.getSearchEngines${queryString}`;
                break;
              case 'referrerKeywordsFromSearchEngineIdGet':
                url += `&method=Referrers.getKeywordsFromSearchEngineId${queryString}`;
                break;
              case 'referrerCampaignsGet':
                url += `&method=Referrers.getCampaigns${queryString}`;
                break;
              case 'referrerKeywordsFromCampaignIdGet':
                url += `&method=Referrers.getKeywordsFromCampaignId${queryString}`;
                break;
              case 'referrerWebsitesGet':
                url += `&method=Referrers.getWebsites${queryString}`;
                break;
              case 'referrerUrlsFromWebsiteIdGet':
                url += `&method=Referrers.getUrlsFromWebsiteId${queryString}`;
                break;
              case 'referrerSocialsGet':
                url += `&method=Referrers.getSocials${queryString}`;
                break;
              case 'referrerAiAssistantsGet':
                url += `&method=Referrers.getAIAssistants${queryString}`;
                break;
              case 'referrerUrlsForSocialGet':
                url += `&method=Referrers.getUrlsForSocial${queryString}`;
                break;
              case 'referrerUrlsForAiAssistantGet':
                url += `&method=Referrers.getUrlsForAIAssistant${queryString}`;
                break;
              case 'referrerNumberOfDistinctSearchEnginesGet':
                url += `&method=Referrers.getNumberOfDistinctSearchEngines${queryString}`;
                break;
              case 'referrerNumberOfDistinctSocialNetworksGet':
                url += `&method=Referrers.getNumberOfDistinctSocialNetworks${queryString}`;
                break;
              case 'referrerNumberOfDistinctKeywordsGet':
                url += `&method=Referrers.getNumberOfDistinctKeywords${queryString}`;
                break;
              case 'referrerNumberOfDistinctCampaignsGet':
                url += `&method=Referrers.getNumberOfDistinctCampaigns${queryString}`;
                break;
              case 'referrerNumberOfDistinctWebsitesGet':
                url += `&method=Referrers.getNumberOfDistinctWebsites${queryString}`;
                break;
              case 'referrerNumberOfDistinctAiAssistantsGet':
                url += `&method=Referrers.getNumberOfDistinctAIAssistants${queryString}`;
                break;
              case 'referrerNumberOfDistinctWebsitesUrlsGet':
                url += `&method=Referrers.getNumberOfDistinctWebsitesUrls${queryString}`;
                break;
            }
            break;
          case 'resolution':
            switch (operation) {
              case 'resolutionConfigurationGet':
                url += `&method=Resolution.getConfiguration${queryString}`;
                break;
              case 'resolutionResolutionGet':
                url += `&method=Resolution.getResolution${queryString}`;
                break;
            }
            break;
          case 'rollUpReporting':
            switch (operation) {
              case 'rollUpReportingAddRollUpPost':
                url += `&method=RollUpReporting.addRollUp${queryString}`;
                break;
              case 'rollUpReportingUpdateRollUpPost':
                url += `&method=RollUpReporting.updateRollUp${queryString}`;
                break;
              case 'rollUpReportingRollUpsPost':
                url += `&method=RollUpReporting.getRollUps${queryString}`;
                break;
            }
            break;
          case 'scheduledReport':
            switch (operation) {
              case 'scheduledReportAddReportPost':
                url += `&method=ScheduledReports.addReport${queryString}`;
                break;
              case 'scheduledReportUpdateReportPost':
                url += `&method=ScheduledReports.updateReport${queryString}`;
                break;
              case 'scheduledReportReportDelete':
                url += `&method=ScheduledReports.deleteReport${queryString}`;
                break;
              case 'scheduledReportReportsGet':
                url += `&method=ScheduledReports.getReports${queryString}`;
                break;
              case 'scheduledReportGenerateReportPost':
                url += `&method=ScheduledReports.generateReport${queryString}`;
                break;
              case 'scheduledReportSendReportPost':
                url += `&method=ScheduledReports.sendReport${queryString}`;
                break;
            }
            break;
          case 'searchEngineKeywordsPerformance':
            switch (operation) {
              case 'searchEngineKeywordsPerformanceKeywordsGet':
                url += `&method=SearchEngineKeywordsPerformance.getKeywords${queryString}`;
                break;
              case 'searchEngineKeywordsPerformanceKeywordsImportedGet':
                url += `&method=SearchEngineKeywordsPerformance.getKeywordsImported${queryString}`;
                break;
              case 'searchEngineKeywordsPerformanceKeywordsGoogleGet':
                url += `&method=SearchEngineKeywordsPerformance.getKeywordsGoogle${queryString}`;
                break;
              case 'searchEngineKeywordsPerformanceKeywordsBingGet':
                url += `&method=SearchEngineKeywordsPerformance.getKeywordsBing${queryString}`;
                break;
              case 'searchEngineKeywordsPerformanceKeywordsYandexGet':
                url += `&method=SearchEngineKeywordsPerformance.getKeywordsYandex${queryString}`;
                break;
              case 'searchEngineKeywordsPerformanceKeywordsGoogleWebGet':
                url += `&method=SearchEngineKeywordsPerformance.getKeywordsGoogleWeb${queryString}`;
                break;
              case 'searchEngineKeywordsPerformanceKeywordsGoogleImageGet':
                url += `&method=SearchEngineKeywordsPerformance.getKeywordsGoogleImage${queryString}`;
                break;
              case 'searchEngineKeywordsPerformanceKeywordsGoogleVideoGet':
                url += `&method=SearchEngineKeywordsPerformance.getKeywordsGoogleVideo${queryString}`;
                break;
              case 'searchEngineKeywordsPerformanceKeywordsGoogleNewsGet':
                url += `&method=SearchEngineKeywordsPerformance.getKeywordsGoogleNews${queryString}`;
                break;
              case 'searchEngineKeywordsPerformanceCrawlingOverviewBingGet':
                url += `&method=SearchEngineKeywordsPerformance.getCrawlingOverviewBing${queryString}`;
                break;
              case 'searchEngineKeywordsPerformanceCrawlingOverviewYandexGet':
                url += `&method=SearchEngineKeywordsPerformance.getCrawlingOverviewYandex${queryString}`;
                break;
              case 'searchEngineKeywordsPerformanceCrawlingErrorExamplesBingGet':
                url += `&method=SearchEngineKeywordsPerformance.getCrawlingErrorExamplesBing${queryString}`;
                break;
            }
            break;
          case 'segmentEditor':
            switch (operation) {
              case 'segmentEditorUserCanAddNewSegmentGet':
                url += `&method=SegmentEditor.isUserCanAddNewSegment${queryString}`;
                break;
              case 'segmentEditorSegmentDelete':
                url += `&method=SegmentEditor.delete${queryString}`;
                break;
              case 'segmentEditorUpdateSegmentPost':
                url += `&method=SegmentEditor.update${queryString}`;
                break;
              case 'segmentEditorAddSegmentPost':
                url += `&method=SegmentEditor.add${queryString}`;
                break;
              case 'segmentEditorSegmentGet':
                url += `&method=SegmentEditor.get${queryString}`;
                break;
              case 'segmentEditorAllSegmentsGet':
                url += `&method=SegmentEditor.getAll${queryString}`;
                break;
            }
            break;
          case 'seo':
            switch (operation) {
              case 'seoRankGet':
                url += `&method=SEO.getRank${queryString}`;
                break;
            }
            break;
          case 'sitesManager':
            switch (operation) {
              case 'sitesManagerGetJavascriptTagGet':
                url += `&method=SitesManager.getJavascriptTag${queryString}`;
                break;
              case 'sitesManagerGetImageTrackingCodeGet':
                url += `&method=SitesManager.getImageTrackingCode${queryString}`;
                break;
              case 'sitesManagerGetSitesFromGroupGet':
                url += `&method=SitesManager.getSitesFromGroup${queryString}`;
                break;
              case 'sitesManagerGetSitesGroupsGet':
                url += `&method=SitesManager.getSitesGroups${queryString}`;
                break;
              case 'sitesManagerGetSiteFromIdGet':
                url += `&method=SitesManager.getSiteFromId${queryString}`;
                break;
              case 'sitesManagerGetSiteUrlsFromIdGet':
                url += `&method=SitesManager.getSiteUrlsFromId${queryString}`;
                break;
              case 'sitesManagerGetAllSitesGet':
                url += `&method=SitesManager.getAllSites${queryString}`;
                break;
              case 'sitesManagerGetAllSitesIdGet':
                url += `&method=SitesManager.getAllSitesId${queryString}`;
                break;
              case 'sitesManagerGetSitesWithAdminAccessGet':
                url += `&method=SitesManager.getSitesWithAdminAccess${queryString}`;
                break;
              case 'sitesManagerGetSitesWithMinimumAccessGet':
                url += `&method=SitesManager.getSitesWithMinimumAccess${queryString}`;
                break;
              case 'sitesManagerGetSitesWithViewAccessGet':
                url += `&method=SitesManager.getSitesWithViewAccess${queryString}`;
                break;
              case 'sitesManagerGetSitesWithAtLeastViewAccessGet':
                url += `&method=SitesManager.getSitesWithAtLeastViewAccess${queryString}`;
                break;
              case 'sitesManagerGetSitesIdWithAdminAccessGet':
                url += `&method=SitesManager.getSitesIdWithAdminAccess${queryString}`;
                break;
              case 'sitesManagerGetSitesIdWithViewAccessGet':
                url += `&method=SitesManager.getSitesIdWithViewAccess${queryString}`;
                break;
              case 'sitesManagerGetSitesIdWithWriteAccessGet':
                url += `&method=SitesManager.getSitesIdWithWriteAccess${queryString}`;
                break;
              case 'sitesManagerGetSitesIdWithAtLeastViewAccessGet':
                url += `&method=SitesManager.getSitesIdWithAtLeastViewAccess${queryString}`;
                break;
              case 'sitesManagerGetSitesIdFromSiteUrlGet':
                url += `&method=SitesManager.getSitesIdFromSiteUrl${queryString}`;
                break;
              case 'sitesManagerAddSitePost':
                url += `&method=SitesManager.addSite${queryString}`;
                break;
              case 'sitesManagerGetSiteSettingsGet':
                url += `&method=SitesManager.getSiteSettings${queryString}`;
                break;
              case 'sitesManagerSiteDelete':
                url += `&method=SitesManager.deleteSite${queryString}`;
                break;
              case 'sitesManagerAddSiteAliasUrlsPost':
                url += `&method=SitesManager.addSiteAliasUrls${queryString}`;
                break;
              case 'sitesManagerSetSiteAliasUrlsPost':
                url += `&method=SitesManager.setSiteAliasUrls${queryString}`;
                break;
              case 'sitesManagerGetIpsForRangeGet':
                url += `&method=SitesManager.getIpsForRange${queryString}`;
                break;
              case 'sitesManagerSetGlobalExcludedIpsPost':
                url += `&method=SitesManager.setGlobalExcludedIps${queryString}`;
                break;
              case 'sitesManagerSetGlobalSearchParametersPost':
                url += `&method=SitesManager.setGlobalSearchParameters${queryString}`;
                break;
              case 'sitesManagerGetSearchKeywordParametersGlobalGet':
                url += `&method=SitesManager.getSearchKeywordParametersGlobal${queryString}`;
                break;
              case 'sitesManagerGetSearchCategoryParametersGlobalGet':
                url += `&method=SitesManager.getSearchCategoryParametersGlobal${queryString}`;
                break;
              case 'sitesManagerGetExcludedQueryParametersGet':
                url += `&method=SitesManager.getExcludedQueryParameters${queryString}`;
                break;
              case 'sitesManagerGetExcludedQueryParametersGlobalGet':
                url += `&method=SitesManager.getExcludedQueryParametersGlobal${queryString}`;
                break;
              case 'sitesManagerGetExcludedUserAgentsGlobalGet':
                url += `&method=SitesManager.getExcludedUserAgentsGlobal${queryString}`;
                break;
              case 'sitesManagerSetGlobalExcludedUserAgentsPost':
                url += `&method=SitesManager.setGlobalExcludedUserAgents${queryString}`;
                break;
              case 'sitesManagerGetExcludedReferrersGet':
                url += `&method=SitesManager.getExcludedReferrers${queryString}`;
                break;
              case 'sitesManagerGetExcludedReferrersGlobalGet':
                url += `&method=SitesManager.getExcludedReferrersGlobal${queryString}`;
                break;
              case 'sitesManagerSetGlobalExcludedReferrersPost':
                url += `&method=SitesManager.setGlobalExcludedReferrers${queryString}`;
                break;
              case 'sitesManagerGetKeepUrlFragmentsGlobalGet':
                url += `&method=SitesManager.getKeepURLFragmentsGlobal${queryString}`;
                break;
              case 'sitesManagerSetKeepUrlFragmentsGlobalPost':
                url += `&method=SitesManager.setKeepURLFragmentsGlobal${queryString}`;
                break;
              case 'sitesManagerGetExcludedIpsGlobalGet':
                url += `&method=SitesManager.getExcludedIpsGlobal${queryString}`;
                break;
              case 'sitesManagerGetDefaultCurrencyGet':
                url += `&method=SitesManager.getDefaultCurrency${queryString}`;
                break;
              case 'sitesManagerSetDefaultCurrencyPost':
                url += `&method=SitesManager.setDefaultCurrency${queryString}`;
                break;
              case 'sitesManagerGetDefaultTimezoneGet':
                url += `&method=SitesManager.getDefaultTimezone${queryString}`;
                break;
              case 'sitesManagerSetDefaultTimezonePost':
                url += `&method=SitesManager.setDefaultTimezone${queryString}`;
                break;
              case 'sitesManagerSetGlobalQueryParamExclusionPost':
                url += `&method=SitesManager.setGlobalQueryParamExclusion${queryString}`;
                break;
              case 'sitesManagerGetExclusionTypeForQueryParamsGet':
                url += `&method=SitesManager.getExclusionTypeForQueryParams${queryString}`;
                break;
              case 'sitesManagerUpdateSitePost':
                url += `&method=SitesManager.updateSite${queryString}`;
                break;
              case 'sitesManagerGetCurrencyListGet':
                url += `&method=SitesManager.getCurrencyList${queryString}`;
                break;
              case 'sitesManagerGetCurrencySymbolsGet':
                url += `&method=SitesManager.getCurrencySymbols${queryString}`;
                break;
              case 'sitesManagerIsTimezoneSupportEnabledGet':
                url += `&method=SitesManager.isTimezoneSupportEnabled${queryString}`;
                break;
              case 'sitesManagerGetTimezonesListGet':
                url += `&method=SitesManager.getTimezonesList${queryString}`;
                break;
              case 'sitesManagerGetTimezoneNameGet':
                url += `&method=SitesManager.getTimezoneName${queryString}`;
                break;
              case 'sitesManagerGetUniqueSiteTimezonesGet':
                url += `&method=SitesManager.getUniqueSiteTimezones${queryString}`;
                break;
              case 'sitesManagerRenameGroupPost':
                url += `&method=SitesManager.renameGroup${queryString}`;
                break;
              case 'sitesManagerGetPatternMatchSitesGet':
                url += `&method=SitesManager.getPatternMatchSites${queryString}`;
                break;
              case 'sitesManagerGetNumWebsitesToDisplayPerPageGet':
                url += `&method=SitesManager.getNumWebsitesToDisplayPerPage${queryString}`;
                break;
            }
            break;
          case 'tagManager':
            switch (operation) {
              case 'tagManagerAddContainerPost':
                url += `&method=TagManager.addContainer${queryString}`;
                break;
              case 'tagManagerAddContainerTagPost':
                url += `&method=TagManager.addContainerTag${queryString}`;
                break;
              case 'tagManagerAddContainerTriggerPost':
                url += `&method=TagManager.addContainerTrigger${queryString}`;
                break;
              case 'tagManagerAddContainerVariablePost':
                url += `&method=TagManager.addContainerVariable${queryString}`;
                break;
              case 'tagManagerAvailableComparisonsGet':
                url += `&method=TagManager.getAvailableComparisons${queryString}`;
                break;
              case 'tagManagerAvailableContainerVariablesGet':
                url += `&method=TagManager.getAvailableContainerVariables${queryString}`;
                break;
              case 'tagManagerAvailableContextsGet':
                url += `&method=TagManager.getAvailableContexts${queryString}`;
                break;
              case 'tagManagerAvailableEnvironmentsGet':
                url += `&method=TagManager.getAvailableEnvironments${queryString}`;
                break;
              case 'tagManagerAvailableEnvironmentsWithPublishCapabilityGet':
                url += `&method=TagManager.getAvailableEnvironmentsWithPublishCapability${queryString}`;
                break;
              case 'tagManagerAvailableTagFireLimitsGet':
                url += `&method=TagManager.getAvailableTagFireLimits${queryString}`;
                break;
              case 'tagManagerAvailableTagTypesInContextGet':
                url += `&method=TagManager.getAvailableTagTypesInContext${queryString}`;
                break;
              case 'tagManagerAvailableTriggerTypesInContextGet':
                url += `&method=TagManager.getAvailableTriggerTypesInContext${queryString}`;
                break;
              case 'tagManagerAvailableVariableTypesInContextGet':
                url += `&method=TagManager.getAvailableVariableTypesInContext${queryString}`;
                break;
              case 'tagManagerChangeDebugUrlPost':
                url += `&method=TagManager.changeDebugUrl${queryString}`;
                break;
              case 'tagManagerContainerEmbedCodeGet':
                url += `&method=TagManager.getContainerEmbedCode${queryString}`;
                break;
              case 'tagManagerContainerGet':
                url += `&method=TagManager.getContainer${queryString}`;
                break;
              case 'tagManagerContainerInstallInstructionsGet':
                url += `&method=TagManager.getContainerInstallInstructions${queryString}`;
                break;
              case 'tagManagerContainerTagGet':
                url += `&method=TagManager.getContainerTag${queryString}`;
                break;
              case 'tagManagerContainerTagsGet':
                url += `&method=TagManager.getContainerTags${queryString}`;
                break;
              case 'tagManagerContainerTriggerGet':
                url += `&method=TagManager.getContainerTrigger${queryString}`;
                break;
              case 'tagManagerContainerTriggerReferencesGet':
                url += `&method=TagManager.getContainerTriggerReferences${queryString}`;
                break;
              case 'tagManagerContainerTriggersGet':
                url += `&method=TagManager.getContainerTriggers${queryString}`;
                break;
              case 'tagManagerContainerVariableGet':
                url += `&method=TagManager.getContainerVariable${queryString}`;
                break;
              case 'tagManagerContainerVariableReferencesGet':
                url += `&method=TagManager.getContainerVariableReferences${queryString}`;
                break;
              case 'tagManagerContainerVariablesGet':
                url += `&method=TagManager.getContainerVariables${queryString}`;
                break;
              case 'tagManagerContainerVersionGet':
                url += `&method=TagManager.getContainerVersion${queryString}`;
                break;
              case 'tagManagerContainerVersionsGet':
                url += `&method=TagManager.getContainerVersions${queryString}`;
                break;
              case 'tagManagerContainersGet':
                url += `&method=TagManager.getContainers${queryString}`;
                break;
              case 'tagManagerCreateContainerVersionPost':
                url += `&method=TagManager.createContainerVersion${queryString}`;
                break;
              case 'tagManagerCreateDefaultContainerForSitePost':
                url += `&method=TagManager.createDefaultContainerForSite${queryString}`;
                break;
              case 'tagManagerContainerDelete':
                url += `&method=TagManager.deleteContainer${queryString}`;
                break;
              case 'tagManagerContainerTagDelete':
                url += `&method=TagManager.deleteContainerTag${queryString}`;
                break;
              case 'tagManagerContainerTriggerDelete':
                url += `&method=TagManager.deleteContainerTrigger${queryString}`;
                break;
              case 'tagManagerContainerVariableDelete':
                url += `&method=TagManager.deleteContainerVariable${queryString}`;
                break;
              case 'tagManagerContainerVersionDelete':
                url += `&method=TagManager.deleteContainerVersion${queryString}`;
                break;
              case 'tagManagerDisablePreviewModePost':
                url += `&method=TagManager.disablePreviewMode${queryString}`;
                break;
              case 'tagManagerEnablePreviewModePost':
                url += `&method=TagManager.enablePreviewMode${queryString}`;
                break;
              case 'tagManagerExportContainerVersionPost':
                url += `&method=TagManager.exportContainerVersion${queryString}`;
                break;
              case 'tagManagerImportContainerVersionPost':
                url += `&method=TagManager.importContainerVersion${queryString}`;
                break;
              case 'tagManagerPauseContainerTagPost':
                url += `&method=TagManager.pauseContainerTag${queryString}`;
                break;
              case 'tagManagerPublishContainerVersionPost':
                url += `&method=TagManager.publishContainerVersion${queryString}`;
                break;
              case 'tagManagerResumeContainerTagPost':
                url += `&method=TagManager.resumeContainerTag${queryString}`;
                break;
              case 'tagManagerUpdateContainerPost':
                url += `&method=TagManager.updateContainer${queryString}`;
                break;
              case 'tagManagerUpdateContainerTagPost':
                url += `&method=TagManager.updateContainerTag${queryString}`;
                break;
              case 'tagManagerUpdateContainerTriggerPost':
                url += `&method=TagManager.updateContainerTrigger${queryString}`;
                break;
              case 'tagManagerUpdateContainerVariablePost':
                url += `&method=TagManager.updateContainerVariable${queryString}`;
                break;
              case 'tagManagerUpdateContainerVersionPost':
                url += `&method=TagManager.updateContainerVersion${queryString}`;
                break;
            }
            break;
          case 'tour':
            switch (operation) {
              case 'tourChallengesGet':
                url += `&method=Tour.getChallenges${queryString}`;
                break;
              case 'tourLevelGet':
                url += `&method=Tour.getLevel${queryString}`;
                break;
              case 'tourSkipChallengePost':
                url += `&method=Tour.skipChallenge${queryString}`;
                break;
            }
            break;
          case 'transition':
            switch (operation) {
              case 'transitionTransitionsForActionGet':
                url += `&method=Transitions.getTransitionsForAction${queryString}`;
                break;
              case 'transitionTransitionsForPageTitleGet':
                url += `&method=Transitions.getTransitionsForPageTitle${queryString}`;
                break;
              case 'transitionTransitionsForPageUrlGet':
                url += `&method=Transitions.getTransitionsForPageUrl${queryString}`;
                break;
              case 'transitionTranslationsGet':
                url += `&method=Transitions.getTranslations${queryString}`;
                break;
              case 'transitionIsPeriodAllowedGet':
                url += `&method=Transitions.isPeriodAllowed${queryString}`;
                break;
            }
            break;
          case 'twoFactorAuth':
            switch (operation) {
              case 'twoFactorAuthResetTwoFactorAuthPost':
                url += `&method=TwoFactorAuth.resetTwoFactorAuth${queryString}`;
                break;
            }
            break;
          case 'userCountry':
            switch (operation) {
              case 'userCountryCountryGet':
                url += `&method=UserCountry.getCountry${queryString}`;
                break;
              case 'userCountryContinentGet':
                url += `&method=UserCountry.getContinent${queryString}`;
                break;
              case 'userCountryRegionGet':
                url += `&method=UserCountry.getRegion${queryString}`;
                break;
              case 'userCountryCityGet':
                url += `&method=UserCountry.getCity${queryString}`;
                break;
              case 'userCountryCountryCodeMappingGet':
                url += `&method=UserCountry.getCountryCodeMapping${queryString}`;
                break;
              case 'userCountryLocationFromIpGet':
                url += `&method=UserCountry.getLocationFromIP${queryString}`;
                break;
              case 'userCountrySetLocationProviderPost':
                url += `&method=UserCountry.setLocationProvider${queryString}`;
                break;
              case 'userCountryNumberOfDistinctCountriesGet':
                url += `&method=UserCountry.getNumberOfDistinctCountries${queryString}`;
                break;
            }
            break;
          case 'userId':
            switch (operation) {
              case 'userIdUsersGet':
                url += `&method=UserId.getUsers${queryString}`;
                break;
            }
            break;
          case 'usersFlow':
            switch (operation) {
              case 'usersFlowUsersFlowPrettyGet':
                url += `&method=UsersFlow.getUsersFlowPretty${queryString}`;
                break;
              case 'usersFlowUsersFlowGet':
                url += `&method=UsersFlow.getUsersFlow${queryString}`;
                break;
              case 'usersFlowInteractionActionsGet':
                url += `&method=UsersFlow.getInteractionActions${queryString}`;
                break;
              case 'usersFlowAvailableDataSourcesGet':
                url += `&method=UsersFlow.getAvailableDataSources${queryString}`;
                break;
            }
            break;
          case 'usersManager':
            switch (operation) {
              case 'usersManagerAvailableRolesGet':
                url += `&method=UsersManager.getAvailableRoles${queryString}`;
                break;
              case 'usersManagerAvailableCapabilitiesGet':
                url += `&method=UsersManager.getAvailableCapabilities${queryString}`;
                break;
              case 'usersManagerSetUserPreferencePost':
                url += `&method=UsersManager.setUserPreference${queryString}`;
                break;
              case 'usersManagerUserPreferenceGet':
                url += `&method=UsersManager.getUserPreference${queryString}`;
                break;
              case 'usersManagerUsersPlusRoleGet':
                url += `&method=UsersManager.getUsersPlusRole${queryString}`;
                break;
              case 'usersManagerUsersGet':
                url += `&method=UsersManager.getUsers${queryString}`;
                break;
              case 'usersManagerUsersLoginGet':
                url += `&method=UsersManager.getUsersLogin${queryString}`;
                break;
              case 'usersManagerUsersSitesFromAccessGet':
                url += `&method=UsersManager.getUsersSitesFromAccess${queryString}`;
                break;
              case 'usersManagerUsersAccessFromSiteGet':
                url += `&method=UsersManager.getUsersAccessFromSite${queryString}`;
                break;
              case 'usersManagerUsersWithSiteAccessGet':
                url += `&method=UsersManager.getUsersWithSiteAccess${queryString}`;
                break;
              case 'usersManagerSitesAccessFromUserGet':
                url += `&method=UsersManager.getSitesAccessFromUser${queryString}`;
                break;
              case 'usersManagerSitesAccessForUserGet':
                url += `&method=UsersManager.getSitesAccessForUser${queryString}`;
                break;
              case 'usersManagerUserGet':
                url += `&method=UsersManager.getUser${queryString}`;
                break;
              case 'usersManagerUserByEmailGet':
                url += `&method=UsersManager.getUserByEmail${queryString}`;
                break;
              case 'usersManagerAddUserPost':
                url += `&method=UsersManager.addUser${queryString}`;
                break;
              case 'usersManagerInviteUserPost':
                url += `&method=UsersManager.inviteUser${queryString}`;
                break;
              case 'usersManagerSetSuperUserAccessPost':
                url += `&method=UsersManager.setSuperUserAccess${queryString}`;
                break;
              case 'usersManagerHasSuperUserAccessGet':
                url += `&method=UsersManager.hasSuperUserAccess${queryString}`;
                break;
              case 'usersManagerUsersHavingSuperUserAccessGet':
                url += `&method=UsersManager.getUsersHavingSuperUserAccess${queryString}`;
                break;
              case 'usersManagerUpdateUserPost':
                url += `&method=UsersManager.updateUser${queryString}`;
                break;
              case 'usersManagerUserDelete':
                url += `&method=UsersManager.deleteUser${queryString}`;
                break;
              case 'usersManagerUserExistsPost':
                url += `&method=UsersManager.userExists${queryString}`;
                break;
              case 'usersManagerUserEmailExistsPost':
                url += `&method=UsersManager.userEmailExists${queryString}`;
                break;
              case 'usersManagerUserLoginFromUserEmailGet':
                url += `&method=UsersManager.getUserLoginFromUserEmail${queryString}`;
                break;
              case 'usersManagerSetUserAccessPost':
                url += `&method=UsersManager.setUserAccess${queryString}`;
                break;
              case 'usersManagerAddCapabilitiesPost':
                url += `&method=UsersManager.addCapabilities${queryString}`;
                break;
            }
            break;
          case 'visitFrequency':
            switch (operation) {
              case 'visitFrequencyGet':
                url += `&method=VisitFrequency.get${queryString}`;
                break;
            }
            break;
          case 'visitTime':
            switch (operation) {
              case 'visitTimeVisitInformationPerLocalTimeGet':
                url += `&method=VisitTime.getVisitInformationPerLocalTime${queryString}`;
                break;
              case 'visitTimeVisitInformationPerServerTimeGet':
                url += `&method=VisitTime.getVisitInformationPerServerTime${queryString}`;
                break;
              case 'visitTimeByDayOfWeekGet':
                url += `&method=VisitTime.getByDayOfWeek${queryString}`;
                break;
            }
            break;
          case 'visitorInterest':
            switch (operation) {
              case 'visitorInterestNumberOfVisitsPerVisitDurationGet':
                url += `&method=VisitorInterest.getNumberOfVisitsPerVisitDuration${queryString}`;
                break;
              case 'visitorInterestNumberOfVisitsPerPageGet':
                url += `&method=VisitorInterest.getNumberOfVisitsPerPage${queryString}`;
                break;
              case 'visitorInterestNumberOfVisitsByDaysSinceLastGet':
                url += `&method=VisitorInterest.getNumberOfVisitsByDaysSinceLast${queryString}`;
                break;
              case 'visitorInterestNumberOfVisitsByVisitCountGet':
                url += `&method=VisitorInterest.getNumberOfVisitsByVisitCount${queryString}`;
                break;
            }
            break;
          case 'visitsSummary':
            switch (operation) {
              case 'visitsSummaryGet':
                url += `&method=VisitsSummary.get${queryString}`;
                break;
              case 'visitsSummaryVisitsGet':
                url += `&method=VisitsSummary.getVisits${queryString}`;
                break;
              case 'visitsSummaryUniqueVisitorsGet':
                url += `&method=VisitsSummary.getUniqueVisitors${queryString}`;
                break;
              case 'visitsSummaryUsersGet':
                url += `&method=VisitsSummary.getUsers${queryString}`;
                break;
              case 'visitsSummaryActionsGet':
                url += `&method=VisitsSummary.getActions${queryString}`;
                break;
              case 'visitsSummaryMaxActionsGet':
                url += `&method=VisitsSummary.getMaxActions${queryString}`;
                break;
              case 'visitsSummaryBounceCountGet':
                url += `&method=VisitsSummary.getBounceCount${queryString}`;
                break;
              case 'visitsSummaryVisitsConvertedGet':
                url += `&method=VisitsSummary.getVisitsConverted${queryString}`;
                break;
              case 'visitsSummarySumVisitsLengthGet':
                url += `&method=VisitsSummary.getSumVisitsLength${queryString}`;
                break;
              case 'visitsSummarySumVisitsLengthPrettyGet':
                url += `&method=VisitsSummary.getSumVisitsLengthPretty${queryString}`;
                break;
            }
            break;
					default:
            throw new NodeOperationError(this.getNode(),`Unknown resource:${resource}`);
				}

        const httpMethod: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT' =  operation.endsWith('Delete') ? 'DELETE' :
                                                                         operation.endsWith('Patch') ? 'PATCH' :
																																				 operation.endsWith('Put') ? 'PUT' :
																																				 operation.endsWith('Post') ? 'POST' : 'GET';

        let body;
        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
        };

        if (!operation.includes('Delete') && ['DELETE', 'PATCH', 'POST', 'PUT'].includes(httpMethod)) {
          body = JSON.parse(requestBody);
        }

        const requestConf = {
          method: httpMethod,
          url,
          headers,
          ...(body ? { body } : {}),
        };
        
        console.log('resource : ' + resource);
        console.log('operation : ' + operation);
        console.log('url : ' + url);
        console.log('requestConf : ' + JSON.stringify(requestConf));

        const responseData = await this.helpers.httpRequest(requestConf);

        console.log('responseData : ' + responseData);

				if (typeof responseData === 'string') {
          const trimmed = responseData.trim();
          if (trimmed !== '') {
            try {
              returnData.push({ json: JSON.parse(trimmed) });
            } catch {
              returnData.push({ text: trimmed });
            }
          } else {
            returnData.push({ 'Status Code': '204 No Content' });
          }
        } else if (responseData) {
          returnData.push(responseData);
        } else {
          returnData.push({ 'Status Code': '204 No Content' });
        }        

			} catch (error) {
        throw new NodeApiError(this.getNode(), {
          message: `Error calling Matomo API: ${error.message}`,
          description: error.stack || 'No stack trace available'
        });
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
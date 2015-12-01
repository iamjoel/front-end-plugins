/*
Arbiter.js
	by Matt Kruse 
	http://ArbiterJS.com - See site for documentation
	
	This work is in the public domain and may be used in any way, for any purpose, without restriction.
*/
var Arbiter = (function () {
	var create_arbiter = function () {
		var subscriptions = {};
		var wildcard_subscriptions = {};
		var persistent_messages = {};
		var id_lookup = {};
		var new_id = 1;
		return {
			'version':'1.0'
			,'updated_on':'2011-12-19'
			,'create': function() { return create_arbiter(); }
			,'subscribe': function() {
				var msg, messages, subscription_list, persisted_subscription_list, subscription, func, options={}, context, wildcard=false, priority=0, id, return_ids=[];
				if (arguments.length<2) { return null; }
				messages = arguments[0];
				func = arguments[arguments.length-1]; // Function is always last argument
				if (arguments.length>2) { options = arguments[1] || {}; }
				if (arguments.length>3) { context = arguments[2]; }

				if (options.priority) {
					priority = options.priority;
				}
				if (typeof messages=="string") {
					messages = messages.split(/[,\s]+/);
				}
				for (var i=0; i<messages.length; i++) {
					msg = messages[i];
					// If the message ends in *, it's a wildcard subscription
					if (/\*$/.test(msg)) {
						wildcard = true;
						msg = msg.replace(/\*$/,'');
						subscription_list = wildcard_subscriptions[msg];				
						if (!subscription_list) {
							wildcard_subscriptions[msg] = subscription_list = [];
						}
					}
					else {
						subscription_list = subscriptions[msg];				
						if (!subscription_list) {
							subscriptions[msg] = subscription_list = [];
						}
					}
					id = new_id++;
					subscription = {'id':id,'f':func,p:priority,self:context,'options':options};
					id_lookup[id] = subscription;
					subscription_list.push ( subscription );
					// Sort the list by priority
					subscription_list = subscription_list.sort( function(a,b) {
						return (a.p>b.p?-1:a.p==b.p?0:1);
					} );
					// Put it back in after sorting
					if (wildcard) {
						wildcard_subscriptions[msg] = subscription_list;
					}
					else {
						subscriptions[msg] = subscription_list;
					}
					return_ids.push(id);
					
					// Check to see if there are any persistent messages that need
					// to be fired immediately
					if (!options.persist && persistent_messages[msg]) {
						persisted_subscription_list = persistent_messages[msg];
						for (var j=0; j<persisted_subscription_list.length; j++) {
							subscription.f.call( subscription.self, persisted_subscription_list[j], {persist:true} );
						}
					}
				}
				// Return an array of id's, or just 1
				if (messages.length>0) {
					return return_ids;
				}
				return return_ids[0];
			}
			
			,'publish': function(msg, data, options) {
				var async_timeout=10,result,overall_result=true,cancelable=true,internal_data={},subscriber, wildcard_msg;
				var subscription_list = subscriptions[msg] || [];
				options = options || {};
				// Look through wildcard subscriptions to find any that apply
				for (wildcard_msg in wildcard_subscriptions) {
					if (msg.indexOf(wildcard_msg)==0) {
						subscription_list = subscription_list.concat( wildcard_subscriptions[wildcard_msg] );
					}
				}
				if (options.persist===true) {
					if (!persistent_messages[msg]) {
						persistent_messages[msg] = [];
					}
					persistent_messages[msg].push( data );
				}
				if (subscription_list.length==0) { 
					return overall_result; 
				}
				if (typeof options.cancelable=="boolean") {
					cancelable = options.cancelable;
				}
				for (var i=0; i<subscription_list.length; i++) {
					subscriber = subscription_list[i];
					if (subscriber.unsubscribed) { 
						continue; // Ignore unsubscribed listeners
					}
					try {
						// Publisher OR subscriber may request async
						if (options.async===true || (subscriber.options && subscriber.options.async)) {
							setTimeout( (function(inner_subscriber) {
								return function() {
									inner_subscriber.f.call( inner_subscriber.self, data, msg, internal_data );
								};
							})(subscriber), async_timeout++ );
						}
						else {
							result = subscriber.f.call( subscriber.self, data, msg, internal_data );
							if (cancelable && result===false) {
								break;
							}
						}
					}
					catch(e) {
						overall_result = false;
					}
				}
				return overall_result;
			}
			
			,'unsubscribe': function(id) {
				if (id_lookup[id]) {
					 id_lookup[id].unsubscribed = true;
					 return true;
				}
				return false;
			}
			
			,'resubscribe': function(id) {
				if (id_lookup[id]) {
					 id_lookup[id].unsubscribed = false;
					 return true;
				}
				return false;
			}
			
		};
	};
	return create_arbiter();
	
})();

$(function(){

	chrome.storage.sync.get(['total','limit'],function(budget){
		$('#total').text(budget.total);
		$('#limit').text(budget.limit);
	})

	$('#spendAmount').click(function(){
		chrome.storage.sync.get(['total','limit'], function(budget){
			var new_total=0;
			if(budget.total){
				new_total+=parseInt(budget.total);
			}

			var amount=$('#amount').val();
			if(amount){
				new_total+=parseInt(amount);
			}
			chrome.storage.sync.set({'total' : new_total},function(){
				if(amount && new_total>=budget.limit){
					var notifOptions={
						type: 'basic',
						iconUrl: 'icon48.png',
						title: 'Limit Reached',
						message: "Looks Like you have spent your limit"
					};
					chrome.notifications.create('limitNotif', notifOptions);
				}
			});
			
			$('#total').text(new_total);
			$('#amount').val('');
		});
	});
});
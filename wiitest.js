var d = new Date();
var n = d.getSeconds();
	    var button = 'A';
        switch (button) {
            case 'A':
			if ((n%20)>9)
				return true;
			else
				return false;

const sort_obj = (orderBy, reverse, cb) =>{
	const key = cb ? 
	(x)=> {return cb(x[orderBy])} : (x)=> {return x[orderBy]};
	reverse = reverse == 'down' ? 1 : -1;
	return (a, b) => {
		return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
	} 
}

module.exports = {sort_obj}
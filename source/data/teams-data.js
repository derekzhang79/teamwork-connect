/* globals module Promise*/

module.exports = function(models) {
	let Team = models.Team;

	return {
		getAllTeams() {
			return new Promise((res, rej) => {
				Team.find((err, teams) => {
					if (err) {
						return rej(err);
					}

					return res(teams);
				});
			}); 
		},
		createTeam(name, form, github, logo, users) {
			let createdDate = new Date(Date.now()).toLocaleDateString();

			let team = new Team({
				name,
				form,
				github,
				logo,
				createdDate,
				users
			});

			return new Promise((res, rej) => {
				team.save(err => {
					if (err) {
						return rej(err);
					}

					return res(team);
				});
			});
		},
		getTeamById(id) {
			return new Promise((res, rej) => {
				Team.findOne({_id: id}, (err, team) => {
					if (err) {
						return rej(err);
					}

					if (team === null) {
						return rej("No such team.");
					}

					return res(team);
				});
			});	
		}, 
	    updateTeamById(id, updateOptions) {
	        return Team.findByIdAndUpdate({_id: id}, updateOptions);
	    },
        removeTeamById(id) {
	        return Team.findById({_id: id}).remove();
	    }
	};
};
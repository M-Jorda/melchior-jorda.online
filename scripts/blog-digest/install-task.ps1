# Enregistre la tâche planifiée Windows du publieur Dev Digest.
#
# À lancer depuis PowerShell (Windows, pas WSL), sans droits administrateur :
#   powershell -ExecutionPolicy Bypass -File \\wsl$\Ubuntu\home\<user>\blog-publisher\scripts\blog-digest\install-task.ps1
#
# Déclencheurs : à l'ouverture de session (après 3 min) et chaque jour à $Time.
# Si le PC était éteint à l'heure prévue, la tâche s'exécute dès que possible.

param(
  [string]$Distro = "Ubuntu",
  # Chemin Linux du lanceur dans le clone de publication.
  [string]$Script = "~/blog-publisher/scripts/blog-digest/run.sh",
  [string]$Time = "20:00",
  [string]$TaskName = "Blog Dev Digest"
)

$ErrorActionPreference = "Stop"

# wsl.exe ouvre brièvement une fenêtre console pendant l'exécution.
$arguments = "-d $Distro -- bash -c `"$Script`""
$action = New-ScheduledTaskAction -Execute "wsl.exe" -Argument $arguments

$atLogon = New-ScheduledTaskTrigger -AtLogOn -User "$env:USERDOMAIN\$env:USERNAME"
$atLogon.Delay = "PT3M"
$daily = New-ScheduledTaskTrigger -Daily -At $Time

$settings = New-ScheduledTaskSettingsSet `
  -StartWhenAvailable `
  -AllowStartIfOnBatteries `
  -DontStopIfGoingOnBatteries `
  -RunOnlyIfNetworkAvailable `
  -MultipleInstances IgnoreNew `
  -ExecutionTimeLimit (New-TimeSpan -Hours 2)

$principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" -LogonType Interactive -RunLevel Limited

Register-ScheduledTask -TaskName $TaskName `
  -Description "Publie les e-mails Dev Digest sur le blog de melchior-jorda.online (rattrapage automatique)." `
  -Action $action -Trigger @($atLogon, $daily) -Settings $settings -Principal $principal -Force | Out-Null

Write-Host "Tâche « $TaskName » enregistrée : à l'ouverture de session (+3 min) et chaque jour à $Time."
Write-Host "Test immédiat : Start-ScheduledTask -TaskName '$TaskName'"
Write-Host "Journal : ~/.local/state/blog-digest/logs/ (dans WSL)"

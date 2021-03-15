/*
 * Copyright (c) 2014, CETIC.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the Institute nor the names of its contributors
 *    may be used to endorse or promote products derived from this software
 *    without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE INSTITUTE AND CONTRIBUTORS ``AS IS'' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL THE INSTITUTE OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
 * OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 */

/**
 * \file
 *         6LBR Plugin manager
 * \author
 *         6LBR Team <6lbr@cetic.be>
 */

#define LOG6LBR_MODULE "PLUGIN"

#include "contiki.h"

#include <stdlib.h>
#include <dlfcn.h>
#include <dirent.h>
#include <errno.h>
#include <string.h>

#include "log-6lbr.h"
#include "slip-config.h"
#include "plugin.h"

static void
plugin_load(char const * plugin_file) {
  void *handle;
  const char *error;
  sixlbr_plugin_t *plugin_descriptor;

  LOG6LBR_INFO("Loading %s\n", plugin_file);
  handle = dlopen(plugin_file, RTLD_NOW);
  if(handle == NULL) {
    LOG6LBR_ERROR("Could not open %s : %s\n", plugin_file, dlerror());
    return;
  }

  *(void **)(&plugin_descriptor) =
      dlsym(handle, "sixlbr_plugin_info");
  if((error = dlerror()) || plugin_descriptor == NULL) {
    LOG6LBR_ERROR("Plugin descriptor not found in %s\n", plugin_file);
    return;
  }
  if (plugin_descriptor->api_version < SIXLBR_PLUGIN_API_VERSION) {
    LOG6LBR_ERROR("Plugin %s use an obsolete api\n", plugin_file);
    return;
  }
  LOG6LBR_INFO("Initialising %s\n", plugin_descriptor->id);
  int result = plugin_descriptor->init();
  if (result != 0) {
    LOG6LBR_ERROR("Initialisation failed, error code is %d\n", result);
  }
}

void plugins_load() {
  DIR *dirp;
  struct dirent *dp;

  if (slip_config_plugins == NULL) return;

  if ((dirp = opendir(slip_config_plugins)) == NULL) {
    LOG6LBR_ERROR("couldn't open '%s' : %s\n", slip_config_plugins, strerror(errno));
    return;
  }

  do {
    errno = 0;
    if ((dp = readdir(dirp)) != NULL) {
      int len = strlen(dp->d_name);
      if ( len > 3 && strcmp(&dp->d_name[len-3], ".so") == 0 ) {
        char * filename = (char *)malloc(strlen(slip_config_plugins)+len+1);
        strcpy(filename, slip_config_plugins);
        strcat(filename, "/");
        strcat(filename, dp->d_name);
        plugin_load(filename);
      }
    }
  } while (dp != NULL);

  if (errno != 0) {
    LOG6LBR_ERROR("error reading directory: %s", strerror(errno));
  }
  closedir(dirp);
}
